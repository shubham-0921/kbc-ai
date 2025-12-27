import { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { useTimer } from '../../hooks/useTimer';
import { TURN_PHASES } from '../../utils/constants';

import { TeamIndicator } from '../game/TeamIndicator';
import { Scoreboard } from '../game/Scoreboard';
import { TopicSelector } from '../setup/TopicSelector';
import { QuestionDisplay } from '../game/QuestionDisplay';
import { AnswerOptions } from '../game/AnswerOptions';
import { AnswerReveal } from '../game/AnswerReveal';
import { Timer } from '../common/Timer';

export function GameScreen() {
  const {
    currentTurn,
    currentTeam,
    teams,
    config,
    availableTopics,
    currentQuestion,
    selectedAnswer,
    selectTopic,
    submitAnswer,
    nextTurn
  } = useGameState();

  const timer = useTimer(
    config.timerLength,
    () => {
      // Auto-submit with null answer on timeout
      if (currentTurn.phase === TURN_PHASES.ANSWERING && selectedAnswer === null) {
        handleAnswerSubmit(null);
      }
    },
    false
  );

  // Start timer when answering phase begins
  useEffect(() => {
    if (currentTurn.phase === TURN_PHASES.ANSWERING && currentQuestion) {
      timer.restart(config.timerLength);
    } else {
      timer.reset();
    }
  }, [currentTurn.phase, currentQuestion]);

  const handleTopicSelect = async (topic) => {
    await selectTopic(topic);
  };

  const handleAnswerSubmit = (answerIndex) => {
    timer.pause();
    const timeSpent = config.timerLength - timer.timeLeft;
    submitAnswer(answerIndex, timeSpent);
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
              <div className="flex justify-center mb-6">
                <Timer
                  timeLeft={timer.timeLeft}
                  duration={config.timerLength}
                />
              </div>

              <QuestionDisplay question={currentQuestion} />

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
