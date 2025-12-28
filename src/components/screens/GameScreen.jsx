import { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { useGameSound } from '../../contexts/SoundContext';
import { TURN_PHASES } from '../../utils/constants';

import { TeamIndicator } from '../game/TeamIndicator';
import { Scoreboard } from '../game/Scoreboard';
import { TopicSelector } from '../setup/TopicSelector';
import { QuestionDisplay } from '../game/QuestionDisplay';
import { AnswerOptions } from '../game/AnswerOptions';
import { AnswerReveal } from '../game/AnswerReveal';
import { Lifelines } from '../game/Lifelines';

export function GameScreen() {
  const {
    currentTurn,
    currentTeam,
    teams,
    config,
    availableTopics,
    currentQuestion,
    selectedAnswer,
    lifelines,
    audiencePollResults,
    selectTopic,
    submitAnswer,
    nextTurn,
    usePhoneAFriend,
    useAudiencePoll
  } = useGameState();

  const { play, playWithCallback, stop, stopAll } = useGameSound();

  // Play question bed music, then transition to suspense loop
  useEffect(() => {
    if (currentTurn.phase === TURN_PHASES.ANSWERING && currentQuestion) {
      // Play question-bed once, then start suspense loop when it ends
      playWithCallback('questionBed', () => {
        // When question-bed ends, start suspense loop
        play('suspense');
      });
    } else {
      // Stop both sounds when leaving answering phase
      stop('questionBed');
      stop('suspense');
    }

    return () => {
      stop('questionBed');
      stop('suspense');
    };
  }, [currentTurn.phase, currentQuestion, play, playWithCallback, stop]);

  // Cleanup: stop all sounds when leaving game screen
  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  const handleTopicSelect = async (topic) => {
    await selectTopic(topic);
  };

  const handleAnswerSubmit = (answerIndex) => {
    submitAnswer(answerIndex, 0); // No timer, so timeSpent is 0
  };

  const handleNext = () => {
    nextTurn();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Team Indicator and Scoreboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <TeamIndicator
              team={currentTeam}
              questionNumber={currentTeam?.questionsAnswered + 1}
              totalQuestions={config.questionsPerTeam}
            />
          </div>
          <div>
            <Scoreboard teams={teams} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Topic Selection Phase */}
          {currentTurn.phase === TURN_PHASES.TOPIC_SELECTION && (
            <TopicSelector
              availableTopics={availableTopics}
              onSelectTopic={handleTopicSelect}
            />
          )}

          {/* Answering Phase */}
          {currentTurn.phase === TURN_PHASES.ANSWERING && currentQuestion && (
            <>
              <QuestionDisplay question={currentQuestion} />

              {/* Lifelines */}
              <Lifelines
                lifelines={lifelines}
                audiencePollResults={audiencePollResults}
                onPhoneAFriend={usePhoneAFriend}
                onAudiencePoll={useAudiencePoll}
                currentQuestion={currentQuestion}
              />

              <AnswerOptions
                options={currentQuestion.options}
                onSubmit={handleAnswerSubmit}
                disabled={false}
              />
            </>
          )}

          {/* Reveal Phase */}
          {currentTurn.phase === TURN_PHASES.REVEAL && currentQuestion && (
            <AnswerReveal
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
}
