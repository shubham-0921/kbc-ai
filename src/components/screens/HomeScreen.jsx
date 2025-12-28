import { useEffect, useState } from 'react';
import { Button } from '../common/Button';
import { useGameState } from '../../hooks/useGameState';
import { useGameSound } from '../../contexts/SoundContext';
import { GAME_PHASES } from '../../utils/constants';
import { hasSavedGame, loadGameState } from '../../services/storageService';

export function HomeScreen() {
  const { setGamePhase } = useGameState();
  const { play, stop } = useGameSound();
  const hasResume = hasSavedGame();
  const [audioStarted, setAudioStarted] = useState(false);

  // Cleanup theme music on unmount
  useEffect(() => {
    return () => {
      stop('theme');
    };
  }, [stop]);

  // Handle first click to start audio
  const handleFirstInteraction = () => {
    if (!audioStarted) {
      play('theme');
      setAudioStarted(true);
    }
  };

  const handleNewGame = () => {
    play('click');
    setGamePhase(GAME_PHASES.SETUP);
  };

  const handleResumeGame = () => {
    play('click');
    const savedState = loadGameState();
    if (savedState) {
      setGamePhase(savedState.gamePhase);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      onClick={handleFirstInteraction}
    >
      {/* Sound indicator - shows until first click */}
      {!audioStarted && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-kbc-purple-light/90 border border-kbc-gold/50 px-4 py-2 rounded-full backdrop-blur-sm animate-pulse">
          <p className="text-sm text-kbc-gold flex items-center gap-2">
            <span className="text-lg">🔊</span>
            Click anywhere to enable sound
          </p>
        </div>
      )}

      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-radial from-kbc-purple-light/30 via-transparent to-transparent pointer-events-none"></div>

      <div className="text-center max-w-4xl relative z-10">
        {/* KBC Style Title */}
        <div className="mb-8 animate-pulse-slow">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-2 tracking-wider">
            <span className="text-kbc-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">
              KAUN BANEGA
            </span>
          </h1>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-wider">
            <span className="text-kbc-gold drop-shadow-[0_0_40px_rgba(255,215,0,0.6)] animate-shimmer">
              CROREPATI
            </span>
          </h1>
        </div>

        <div className="bg-gradient-to-r from-kbc-purple-light to-kbc-purple border-2 border-kbc-gold rounded-lg p-6 mb-8 shadow-[0_0_30px_rgba(255,215,0,0.3)]">
          <p className="text-2xl md:text-3xl font-bold text-kbc-gold mb-2">
            🇮🇳 INDIA EDITION 🇮🇳
          </p>
          <p className="text-lg text-gray-300">
            Team Battle • Desi Sawaal • Crorepati Jawaab!
          </p>
        </div>

        {/* Buttons with KBC styling */}
        <div className="flex flex-col gap-4 items-center mb-12">
          <button
            onClick={handleNewGame}
            className="w-full max-w-md px-12 py-6 bg-gradient-to-r from-kbc-gold to-kbc-gold-dark text-kbc-purple font-bold text-2xl rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.7)] hover:scale-105 transition-all duration-300 border-2 border-yellow-400"
          >
            🎮 NAYA KHEL
          </button>

          {hasResume && (
            <button
              onClick={handleResumeGame}
              className="w-full max-w-md px-12 py-6 bg-kbc-purple-light text-kbc-gold font-bold text-xl rounded-lg border-2 border-kbc-gold hover:bg-kbc-purple hover:scale-105 transition-all duration-300"
            >
              ↻ KHEL JAARI RAKHO
            </button>
          )}
        </div>

        {/* KBC Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-kbc-purple-light to-kbc-purple border border-kbc-gold/30 rounded-lg p-6 hover:border-kbc-gold transition-all">
            <div className="text-5xl mb-3">🇮🇳</div>
            <h3 className="font-bold text-lg text-kbc-gold mb-2">Desi Sawaal</h3>
            <p className="text-gray-300 text-sm">Bollywood, Cricket, Street Food aur bahut kuch!</p>
          </div>

          <div className="bg-gradient-to-br from-kbc-purple-light to-kbc-purple border border-kbc-gold/30 rounded-lg p-6 hover:border-kbc-gold transition-all">
            <div className="text-5xl mb-3">📰</div>
            <h3 className="font-bold text-lg text-kbc-gold mb-2">Taaza Khabar</h3>
            <p className="text-gray-300 text-sm">2024-25 ki latest news aur trending topics</p>
          </div>

          <div className="bg-gradient-to-br from-kbc-purple-light to-kbc-purple border border-kbc-gold/30 rounded-lg p-6 hover:border-kbc-gold transition-all">
            <div className="text-5xl mb-3">🎊</div>
            <h3 className="font-bold text-lg text-kbc-gold mb-2">Party Mazaa</h3>
            <p className="text-gray-300 text-sm">Alcohol, Memes aur entertainment!</p>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-8 text-kbc-gold/70 text-sm italic">
          "Computer ji, lock kiya jaye!"
        </div>
      </div>
    </div>
  );
}
