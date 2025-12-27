import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ANSWER_LABELS } from '../../utils/constants';

export function AnswerReveal({ question, selectedAnswer, onNext }) {
  const isCorrect = selectedAnswer === question.correctIndex;
  const timedOut = selectedAnswer === null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Result Banner */}
      <Card className={`text-center ${isCorrect ? 'bg-green-50 border-4 border-green-500' : 'bg-red-50 border-4 border-red-500'}`}>
        <div className="text-6xl mb-2">
          {isCorrect ? '🎉' : timedOut ? '⏱️' : '❌'}
        </div>
        <h2 className={`text-4xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {isCorrect ? 'Correct!' : timedOut ? 'Time\'s Up!' : 'Incorrect'}
        </h2>
        <p className="text-2xl font-semibold mt-2">
          {isCorrect ? '+1 Point' : '+0 Points'}
        </p>
      </Card>

      {/* Options with correct/incorrect highlighting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          const isThisCorrect = index === question.correctIndex;
          const wasSelected = index === selectedAnswer;

          let bgColor = 'bg-white';
          let borderColor = 'border-gray-200';
          let emoji = '';

          if (isThisCorrect) {
            bgColor = 'bg-green-100';
            borderColor = 'border-green-500';
            emoji = '✓';
          } else if (wasSelected && !isThisCorrect) {
            bgColor = 'bg-red-100';
            borderColor = 'border-red-500';
            emoji = '✗';
          }

          return (
            <div
              key={index}
              className={`p-6 rounded-xl border-4 ${borderColor} ${bgColor} transition-all`}
            >
              <div className="flex items-start gap-3">
                <span className="inline-block w-8 h-8 rounded-full bg-gray-700 text-white text-center leading-8 font-bold flex-shrink-0">
                  {ANSWER_LABELS[index]}
                </span>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">{option}</p>
                </div>
                {emoji && (
                  <span className="text-2xl flex-shrink-0">{emoji}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      <Card className="bg-blue-50">
        <h3 className="font-bold text-lg text-gray-800 mb-2">💡 Did you know?</h3>
        <p className="text-gray-700 text-lg">{question.explanation}</p>
      </Card>

      {/* Next Button */}
      <div className="text-center pt-4">
        <Button onClick={onNext} variant="primary" className="px-12 text-2xl">
          Next Question →
        </Button>
      </div>
    </div>
  );
}
