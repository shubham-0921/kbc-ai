import { Card } from '../common/Card';

export function Scoreboard({ teams }) {
  // Sort by score (descending)
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <Card className="bg-gray-50">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Scoreboard
      </h3>
      <div className="space-y-2">
        {sortedTeams.map((team, index) => (
          <div
            key={team.id}
            className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-400">
                #{index + 1}
              </span>
              <span className={`font-bold text-lg ${team.colorScheme.text}`}>
                {team.name}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">
                {team.score}
              </div>
              <div className="text-xs text-gray-500">
                {team.questionsAnswered} answered
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
