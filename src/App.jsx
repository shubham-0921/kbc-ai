import { GameProvider } from './contexts/GameContext';
import { useGameState } from './hooks/useGameState';
import { GAME_PHASES } from './utils/constants';

// Import screens
import { HomeScreen } from './components/screens/HomeScreen';
import { SetupScreen } from './components/screens/SetupScreen';
import { TeamDisplayScreen } from './components/screens/TeamDisplayScreen';
import { GameScreen } from './components/screens/GameScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';

function GameApp() {
  const { gamePhase } = useGameState();

  return (
    <div className="app-container">
      {gamePhase === GAME_PHASES.HOME && <HomeScreen />}
      {gamePhase === GAME_PHASES.SETUP && <SetupScreen />}
      {gamePhase === GAME_PHASES.TEAM_DISPLAY && <TeamDisplayScreen />}
      {gamePhase === GAME_PHASES.PLAYING && <GameScreen />}
      {gamePhase === GAME_PHASES.RESULTS && <ResultsScreen />}
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
}

export default App;
