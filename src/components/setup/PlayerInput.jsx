import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../common/Button';
import { DEFAULT_CONFIG } from '../../utils/constants';

export function PlayerInput({ players, setPlayers }) {
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        id: uuidv4(),
        name: newPlayerName.trim(),
        teamId: null
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const handleRemovePlayer = (id) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-kbc-gold">Add Players</h2>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter player name"
          className="flex-1 px-4 py-3 text-lg bg-white border-2 border-kbc-gold/50 rounded-lg focus:outline-none focus:border-kbc-gold placeholder:text-gray-400"
          style={{ color: '#1a0b2e' }}
          maxLength={20}
        />
        <Button
          onClick={handleAddPlayer}
          variant="primary"
          disabled={!newPlayerName.trim()}
          className="px-6"
        >
          Add
        </Button>
      </div>

      {/* Player count */}
      <p className="text-sm text-gray-300">
        {players.length} player{players.length !== 1 ? 's' : ''} added
        {players.length < DEFAULT_CONFIG.minPlayers && (
          <span className="text-red-400 ml-2">
            (Minimum {DEFAULT_CONFIG.minPlayers} required)
          </span>
        )}
      </p>

      {/* Player list */}
      {players.length > 0 && (
        <div className="bg-kbc-purple/50 border border-kbc-gold/30 rounded-lg p-4 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between bg-kbc-purple-light border border-kbc-gold/50 px-4 py-2 rounded-lg"
              >
                <span className="font-semibold text-kbc-gold">{player.name}</span>
                <button
                  onClick={() => handleRemovePlayer(player.id)}
                  className="text-red-400 hover:text-red-300 font-bold text-xl"
                  aria-label="Remove player"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
