import { useState } from 'react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { useGameState } from '../../hooks/useGameState';
import { shuffleTeams } from '../../services/teamService';
import { GAME_PHASES } from '../../utils/constants';

export function TeamDisplayScreen() {
  const { teams, players, config, setState, setGamePhase, initializeGame } = useGameState();
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [tempName, setTempName] = useState('');

  const handleShuffle = () => {
    const newTeams = shuffleTeams(players, teams.length);
    setState(prev => ({
      ...prev,
      teams: newTeams,
      players: players.map(player => ({
        ...player,
        teamId: newTeams.find(team => team.playerIds.includes(player.id))?.id || null
      }))
    }));
  };

  const handleStartGame = () => {
    initializeGame(players, teams, config);
  };

  const handleBack = () => {
    setGamePhase(GAME_PHASES.SETUP);
  };

  const getTeamPlayers = (team) => {
    return players.filter(p => team.playerIds.includes(p.id));
  };

  const handleEditTeamName = (team) => {
    setEditingTeamId(team.id);
    setTempName(team.name);
  };

  const handleSaveTeamName = (teamId) => {
    if (tempName.trim()) {
      setState(prev => ({
        ...prev,
        teams: prev.teams.map(team =>
          team.id === teamId ? { ...team, name: tempName.trim() } : team
        )
      }));
    }
    setEditingTeamId(null);
    setTempName('');
  };

  const handleCancelEdit = () => {
    setEditingTeamId(null);
    setTempName('');
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-kbc-gold mb-2 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            Teams Taiyaar!
          </h1>
          <p className="text-lg text-gray-300">
            Review teams ya shuffle karein • Team names customize kar sakte hain
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {teams.map((team) => {
            const teamPlayers = getTeamPlayers(team);
            const isEditing = editingTeamId === team.id;

            return (
              <Card
                key={team.id}
                className={`border-4 ${team.colorScheme.border} hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all`}
              >
                {/* Team Name - Editable */}
                {isEditing ? (
                  <div className="mb-4 space-y-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-full px-3 py-2 bg-white text-kbc-purple font-bold text-xl rounded-lg border-2 border-kbc-gold focus:outline-none"
                      style={{ color: '#1a0b2e' }}
                      maxLength={20}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveTeamName(team.id)}
                        className="flex-1 px-3 py-1 bg-green-500 text-white rounded text-sm font-bold hover:bg-green-600"
                      >
                        ✓ Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm font-bold hover:bg-red-600"
                      >
                        ✗ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-2xl font-bold ${team.colorScheme.text}`}>
                      {team.name}
                    </h3>
                    <button
                      onClick={() => handleEditTeamName(team)}
                      className="text-kbc-gold hover:text-yellow-300 text-sm font-bold"
                      title="Edit team name"
                    >
                      ✏️ Edit
                    </button>
                  </div>
                )}

                {/* Players */}
                <div className="space-y-2">
                  {teamPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="bg-kbc-purple/50 border border-kbc-gold/30 px-4 py-2 rounded-lg font-semibold text-white"
                    >
                      {player.name}
                    </div>
                  ))}
                </div>

                {/* Team Info */}
                <div className="mt-4 pt-4 border-t border-kbc-gold/30">
                  <p className="text-sm text-gray-300">
                    {teamPlayers.length} player{teamPlayers.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Game Info */}
        <Card className="mb-8 border-kbc-gold/50">
          <div className="text-center">
            <h3 className="text-xl font-bold text-kbc-gold mb-2">Game Settings</h3>
            <div className="flex justify-center gap-8 text-lg">
              <div>
                <span className="text-gray-300">Questions per team:</span>
                <span className="font-bold text-kbc-gold ml-2">{config.questionsPerTeam}</span>
              </div>
              <div>
                <span className="text-gray-300">Total questions:</span>
                <span className="font-bold text-kbc-gold ml-2">{config.questionsPerTeam * teams.length}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <Button
              onClick={handleBack}
              variant="secondary"
              className="flex-1 md:flex-none"
            >
              ← Wapas
            </Button>
            <Button
              onClick={handleShuffle}
              variant="secondary"
              className="flex-1 md:flex-none"
            >
              🔀 Shuffle Teams
            </Button>
          </div>

          <Button
            onClick={handleStartGame}
            variant="success"
            className="md:w-auto text-2xl"
          >
            Khel Shuru Karo! 🎮
          </Button>
        </div>
      </div>
    </div>
  );
}
