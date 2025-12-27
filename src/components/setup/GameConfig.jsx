import { DEFAULT_CONFIG } from '../../utils/constants';

export function GameConfig({ config, setConfig }) {
  const handleTeamCountChange = (value) => {
    setConfig({ ...config, numTeams: parseInt(value) });
  };

  const handleQuestionsChange = (value) => {
    setConfig({ ...config, questionsPerTeam: parseInt(value) });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-kbc-gold">Game Configuration</h2>

      {/* Number of Teams */}
      <div>
        <label className="block text-lg font-semibold text-white mb-3">
          Number of Teams
        </label>
        <div className="flex flex-wrap gap-3">
          {[2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleTeamCountChange(num)}
              className={`px-8 py-4 rounded-lg font-bold text-xl transition-all duration-300 ${
                config.numTeams === num
                  ? 'bg-gradient-to-r from-kbc-gold to-kbc-gold-dark text-kbc-purple shadow-[0_0_20px_rgba(255,215,0,0.5)] scale-110 border-2 border-yellow-400'
                  : 'bg-kbc-purple-light text-white border-2 border-kbc-gold/30 hover:border-kbc-gold hover:scale-105'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Per Team */}
      <div>
        <label className="block text-lg font-semibold text-white mb-2">
          Questions Per Team: <span className="text-kbc-gold">{config.questionsPerTeam}</span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={config.questionsPerTeam}
          onChange={(e) => handleQuestionsChange(e.target.value)}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #ffd700 0%, #ffd700 ${(config.questionsPerTeam / 10) * 100}%, #2d1b4e ${(config.questionsPerTeam / 10) * 100}%, #2d1b4e 100%)`
          }}
        />
        <div className="flex justify-between text-sm text-gray-300 mt-2">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
        <p className="text-sm text-gray-300 mt-3">
          Total questions: <span className="text-kbc-gold font-bold">{config.questionsPerTeam * (config.numTeams || 2)}</span>
        </p>
      </div>
    </div>
  );
}
