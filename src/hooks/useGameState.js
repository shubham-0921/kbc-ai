import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameContext } from '../contexts/GameContext';
import { GAME_PHASES, TURN_PHASES, TOPICS } from '../utils/constants';
import { clearGameState } from '../services/storageService';
import anthropicService from '../services/anthropicService';

export function useGameState() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }

  const { state, setState } = context;

  // Computed values
  const currentTeam = state.teams[state.currentTurn.teamIndex] || null;

  const isGameComplete = state.teams.length > 0 && state.teams.every(
    team => team.questionsAnswered >= state.config.questionsPerTeam
  );

  const leaderboard = [...state.teams].sort((a, b) => b.score - a.score);

  const winner = isGameComplete ? leaderboard[0] : null;

  // Action methods
  const setGamePhase = (phase) => {
    setState(prev => ({
      ...prev,
      gamePhase: phase
    }));
  };

  const initializeGame = (players, teams, config) => {
    setState(prev => ({
      ...prev,
      players,
      teams,
      config,
      gamePhase: GAME_PHASES.PLAYING,
      currentTurn: {
        teamIndex: 0,
        questionIndex: 0,
        phase: TURN_PHASES.TOPIC_SELECTION
      },
      availableTopics: [...TOPICS],
      questionHistory: [],
      currentQuestion: null,
      selectedAnswer: null,
      timeSpent: 0,
      lifelines: {
        phoneAFriend: false,
        audiencePoll: false
      },
      audiencePollResults: null,
      hotSeatPlayer: null,
      hotSeatHistory: {}
    }));
  };

  const selectTopic = async (topic) => {
    // Get all players from current team
    const teamPlayers = state.players.filter(p => currentTeam.playerIds.includes(p.id));

    // Get players who haven't been called yet for this team
    const calledPlayerIds = state.hotSeatHistory[currentTeam.id] || [];
    let availablePlayers = teamPlayers.filter(p => !calledPlayerIds.includes(p.id));

    // If all players have been called, reset and use all players
    if (availablePlayers.length === 0) {
      availablePlayers = teamPlayers;
      // Reset history for this team
      setState(prev => ({
        ...prev,
        hotSeatHistory: {
          ...prev.hotSeatHistory,
          [currentTeam.id]: []
        }
      }));
    }

    // Select random player from available (uncalled) players
    const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];

    // Remove topic from available and reset lifelines for new question
    setState(prev => ({
      ...prev,
      availableTopics: prev.availableTopics.filter(t => t !== topic),
      currentTurn: {
        ...prev.currentTurn,
        phase: TURN_PHASES.ANSWERING
      },
      lifelines: {
        phoneAFriend: false,
        audiencePoll: false
      },
      audiencePollResults: null,
      hotSeatPlayer: randomPlayer,
      hotSeatHistory: {
        ...prev.hotSeatHistory,
        [currentTeam.id]: [...(prev.hotSeatHistory[currentTeam.id] || []), randomPlayer.id]
      }
    }));

    try {
      // Generate question
      const questionData = await anthropicService.generateQuestion(topic);

      const question = {
        id: uuidv4(),
        topic,
        ...questionData,
        teamId: currentTeam.id,
        generatedAt: Date.now()
      };

      setState(prev => ({
        ...prev,
        currentQuestion: question,
        selectedAnswer: null,
        timeSpent: 0,
        lifelines: {
          phoneAFriend: false,
          audiencePoll: false
        },
        audiencePollResults: null
      }));

      return question;
    } catch (error) {
      console.error('Failed to generate question:', error);
      // Revert to topic selection on error
      setState(prev => ({
        ...prev,
        availableTopics: [...prev.availableTopics, topic],
        currentTurn: {
          ...prev.currentTurn,
          phase: TURN_PHASES.TOPIC_SELECTION
        }
      }));
      throw error;
    }
  };

  const submitAnswer = (selectedIndex, timeSpent) => {
    setState(prev => ({
      ...prev,
      selectedAnswer: selectedIndex,
      timeSpent,
      currentTurn: {
        ...prev.currentTurn,
        phase: TURN_PHASES.REVEAL
      }
    }));
  };

  const nextTurn = () => {
    const isCorrect = state.selectedAnswer === state.currentQuestion?.correctIndex;
    const currentTeamIndex = state.currentTurn.teamIndex;

    // Record question result
    const questionResult = {
      questionId: state.currentQuestion.id,
      teamId: state.teams[currentTeamIndex].id,
      selectedIndex: state.selectedAnswer,
      isCorrect,
      timeSpent: state.timeSpent,
      timestamp: Date.now()
    };

    // Update team score and questions answered
    const updatedTeams = state.teams.map((team, idx) => {
      if (idx === currentTeamIndex) {
        return {
          ...team,
          score: isCorrect ? team.score + 1 : team.score,
          questionsAnswered: team.questionsAnswered + 1
        };
      }
      return team;
    });

    // Check if game is complete after this update
    const gameComplete = updatedTeams.every(
      team => team.questionsAnswered >= state.config.questionsPerTeam
    );

    if (gameComplete) {
      setState(prev => ({
        ...prev,
        teams: updatedTeams,
        questionHistory: [...prev.questionHistory, questionResult],
        gamePhase: GAME_PHASES.RESULTS
      }));
    } else {
      // Move to next team
      const nextTeamIndex = (currentTeamIndex + 1) % state.teams.length;

      // Refresh topics if all used
      const newAvailableTopics = state.availableTopics.length === 0
        ? [...TOPICS]
        : state.availableTopics;

      setState(prev => ({
        ...prev,
        teams: updatedTeams,
        questionHistory: [...prev.questionHistory, questionResult],
        currentTurn: {
          teamIndex: nextTeamIndex,
          questionIndex: 0,
          phase: TURN_PHASES.TOPIC_SELECTION
        },
        availableTopics: newAvailableTopics,
        currentQuestion: null,
        selectedAnswer: null,
        timeSpent: 0,
        audiencePollResults: null,
        hotSeatPlayer: null
      }));
    }
  };

  const usePhoneAFriend = () => {
    setState(prev => ({
      ...prev,
      lifelines: {
        ...prev.lifelines,
        phoneAFriend: true
      }
    }));
  };

  const useAudiencePoll = () => {
    // Generate random poll results with bias towards correct answer
    const correctIndex = state.currentQuestion?.correctIndex;
    if (correctIndex === null || correctIndex === undefined) return;

    const pollResults = [0, 0, 0, 0];

    // Give correct answer 40-60% of votes
    const correctPercentage = 40 + Math.random() * 20;
    pollResults[correctIndex] = correctPercentage;

    // Distribute remaining percentage among other options
    let remainingPercentage = 100 - correctPercentage;
    const otherIndices = [0, 1, 2, 3].filter(i => i !== correctIndex);

    otherIndices.forEach((idx, i) => {
      if (i === otherIndices.length - 1) {
        // Last option gets whatever is left
        pollResults[idx] = remainingPercentage;
      } else {
        // Random percentage from remaining
        const percentage = Math.random() * remainingPercentage * 0.6;
        pollResults[idx] = percentage;
        remainingPercentage -= percentage;
      }
    });

    // Round to integers and ensure they sum to 100
    const roundedResults = pollResults.map(p => Math.round(p));
    const sum = roundedResults.reduce((a, b) => a + b, 0);
    if (sum !== 100) {
      roundedResults[correctIndex] += (100 - sum);
    }

    setState(prev => ({
      ...prev,
      lifelines: {
        ...prev.lifelines,
        audiencePoll: true
      },
      audiencePollResults: roundedResults
    }));
  };

  const resetGame = () => {
    clearGameState();
    setState({
      gamePhase: GAME_PHASES.HOME,
      players: [],
      teams: [],
      config: {
        questionsPerTeam: 5,
        timerLength: 30
      },
      currentTurn: {
        teamIndex: 0,
        questionIndex: 0,
        phase: TURN_PHASES.TOPIC_SELECTION
      },
      availableTopics: [...TOPICS],
      questionHistory: [],
      currentQuestion: null,
      selectedAnswer: null,
      timeSpent: 0,
      lifelines: {
        phoneAFriend: false,
        audiencePoll: false
      },
      audiencePollResults: null,
      hotSeatPlayer: null,
      hotSeatHistory: {}
    });
  };

  const replayWithSameTeams = () => {
    setState(prev => ({
      ...prev,
      teams: prev.teams.map(team => ({
        ...team,
        score: 0,
        questionsAnswered: 0
      })),
      gamePhase: GAME_PHASES.PLAYING,
      currentTurn: {
        teamIndex: 0,
        questionIndex: 0,
        phase: TURN_PHASES.TOPIC_SELECTION
      },
      availableTopics: [...TOPICS],
      questionHistory: [],
      currentQuestion: null,
      selectedAnswer: null,
      timeSpent: 0,
      lifelines: {
        phoneAFriend: false,
        audiencePoll: false
      },
      audiencePollResults: null,
      hotSeatPlayer: null,
      hotSeatHistory: {}
    }));
  };

  return {
    // State
    ...state,

    // Computed values
    currentTeam,
    isGameComplete,
    leaderboard,
    winner,

    // Actions
    setState,
    setGamePhase,
    initializeGame,
    selectTopic,
    submitAnswer,
    nextTurn,
    resetGame,
    replayWithSameTeams,
    usePhoneAFriend,
    useAudiencePoll
  };
}
