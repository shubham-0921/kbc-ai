import { createContext, useState, useEffect, useRef } from 'react';
import { GAME_PHASES, TURN_PHASES, TOPICS, DEFAULT_CONFIG } from '../utils/constants';
import { saveGameState, loadGameState } from '../services/storageService';

export const GameContext = createContext(null);

const initialState = {
  gamePhase: GAME_PHASES.HOME,
  players: [],
  teams: [],
  config: {
    questionsPerTeam: DEFAULT_CONFIG.questionsPerTeam,
    timerLength: DEFAULT_CONFIG.timerLength
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
  hotSeatHistory: {} // Track which players have been called per team
};

export function GameProvider({ children }) {
  const [state, setState] = useState(() => {
    // Try to load saved game on initialization
    const savedState = loadGameState();
    return savedState || initialState;
  });

  const saveTimeoutRef = useRef(null);

  // Auto-save to localStorage with debouncing
  useEffect(() => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for saving (500ms debounce)
    saveTimeoutRef.current = setTimeout(() => {
      if (state.gamePhase !== GAME_PHASES.HOME) {
        saveGameState(state);
      }
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state]);

  const value = {
    state,
    setState
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
