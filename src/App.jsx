import { GameProvider } from './contexts/GameContext';
import { SoundProvider } from './contexts/SoundContext';
import { useGameState } from './hooks/useGameState';
import { GAME_PHASES } from './utils/constants';

// Import screens
import { HomeScreen } from './components/screens/HomeScreen';
import { SetupScreen } from './components/screens/SetupScreen';
import { TeamDisplayScreen } from './components/screens/TeamDisplayScreen';
import { GameScreen } from './components/screens/GameScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import { SoundControl } from './components/common/SoundControl';
import { Soundboard } from './components/common/Soundboard';

function GameApp() {
  const { gamePhase } = useGameState();

  return (
    <div className="app-container">
      {/* Sound control - fixed position in top right */}
      <SoundControl />

      {/* Soundboard - collapsible sound/video player */}
      <Soundboard />

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
    <SoundProvider>
      <GameProvider>
        <GameApp />
      </GameProvider>
    </SoundProvider>
  );
}

export default App;
