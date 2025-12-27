import { Card } from '../common/Card';

export function TeamIndicator({ team, questionNumber, totalQuestions }) {
  if (!team) return null;

  return (
    <Card className={`border-4 ${team.colorScheme.border} text-center`}>
      <p className="text-sm text-gray-600 mb-1">Current Turn</p>
      <h2 className={`text-4xl font-bold ${team.colorScheme.text} mb-2`}>
        {team.name}
      </h2>
      <p className="text-lg text-gray-700">
        Question {questionNumber} of {totalQuestions}
      </p>
    </Card>
  );
}
