import { useState } from 'react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { PlayerInput } from '../setup/PlayerInput';
import { GameConfig } from '../setup/GameConfig';
import { useGameState } from '../../hooks/useGameState';
import { createTeams } from '../../services/teamService';
import { GAME_PHASES, DEFAULT_CONFIG } from '../../utils/constants';

export function SetupScreen() {
  const { setGamePhase, setState } = useGameState();
  const [players, setPlayers] = useState([]);
  const [config, setConfig] = useState({
    numTeams: 2,
    questionsPerTeam: DEFAULT_CONFIG.questionsPerTeam
  });

  const canProceed = players.length >= DEFAULT_CONFIG.minPlayers &&
                      config.numTeams >= DEFAULT_CONFIG.minTeams;

  const handleCreateTeams = () => {
    if (!canProceed) return;

    try {
      // Create teams with random distribution
      const teams = createTeams(players, config.numTeams);

      // Update game state
      setState(prev => ({
        ...prev,
        players,
        teams,
        config: {
          questionsPerTeam: config.questionsPerTeam,
          timerLength: DEFAULT_CONFIG.timerLength
        },
        gamePhase: GAME_PHASES.TEAM_DISPLAY
      }));
    } catch (error) {
      console.error('Failed to create teams:', error);
      alert('Failed to create teams. Please try again.');
    }
  };

  const handleBack = () => {
    setGamePhase(GAME_PHASES.HOME);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-2">
            Game Setup
          </h1>
          <p className="text-lg text-gray-600">
            Add players and configure your game
          </p>
        </div>

        {/* Setup Cards */}
        <div className="space-y-6">
          {/* Players */}
          <Card>
            <PlayerInput players={players} setPlayers={setPlayers} />
          </Card>

          {/* Configuration */}
          <Card>
            <GameConfig config={config} setConfig={setConfig} />
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-between">
          <Button
            onClick={handleBack}
            variant="secondary"
            className="md:w-auto"
          >
            ← Back
          </Button>

          <Button
            onClick={handleCreateTeams}
            variant="primary"
            disabled={!canProceed}
            className="md:w-auto"
          >
            Create Teams →
          </Button>
        </div>

        {/* Validation message */}
        {!canProceed && players.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg text-center">
            <p className="text-yellow-800 font-semibold">
              {players.length < DEFAULT_CONFIG.minPlayers
                ? `Add at least ${DEFAULT_CONFIG.minPlayers} players to continue`
                : 'Please configure the game settings'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
