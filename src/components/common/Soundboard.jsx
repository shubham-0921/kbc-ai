import { useState, useRef } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { useGameSound } from '../../contexts/SoundContext';

const SOUND_FILES = [
  { name: 'Theme', file: 'theme.mp3', type: 'audio', icon: '🎵' },
  { name: 'Question Bed', file: 'question-bed.mp3', type: 'audio', icon: '❓' },
  { name: 'Suspense', file: 'suspense.mp3', type: 'audio', icon: '⏰' },
  { name: 'Lock', file: 'lock.mp3', type: 'audio', icon: '🔒' },
  { name: 'Phone a Friend', file: 'phone_a_friend.mp3', type: 'audio', icon: '📞' },
  { name: 'Winner', file: 'winner.mp3', type: 'audio', icon: '🏆' },
  { name: 'Correct Answer', file: 'correct.mp4', type: 'video', icon: '✅' },
  { name: 'Wrong Answer', file: 'wrong.mp4', type: 'video', icon: '❌' },
  { name: 'Final Video', file: 'final.mp4', type: 'video', icon: '🎬' },
];

export function Soundboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const audioRef = useRef(null);
  const { stopAll } = useGameSound();

  const handlePlayAudio = (file) => {
    // Stop all game sounds
    stopAll();

    // Stop currently playing soundboard audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Play new audio
    const audio = new Audio(`/sounds/${file}`);
    audioRef.current = audio;
    setPlayingAudio(file);

    audio.play().catch(err => {
      console.warn('Failed to play audio:', err);
    });

    audio.onended = () => {
      setPlayingAudio(null);
    };
  };

  const handlePlayVideo = (file) => {
    // Stop all game sounds
    stopAll();

    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayingAudio(null);
    }

    // Show video player
    setCurrentVideo(file);
  };

  const handleCloseVideo = () => {
    setCurrentVideo(null);
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayingAudio(null);
    }
  };

  return (
    <>
      {/* Video Player */}
      {currentVideo && (
        <VideoPlayer
          videoSrc={`/sounds/${currentVideo}`}
          onClose={handleCloseVideo}
          autoPlay={true}
        />
      )}

      {/* Soundboard Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-20 right-4 z-40
          bg-gradient-to-r from-kbc-gold to-kbc-gold-dark
          text-kbc-purple font-bold rounded-full p-4
          shadow-[0_0_20px_rgba(255,215,0,0.5)]
          hover:shadow-[0_0_30px_rgba(255,215,0,0.7)]
          hover:scale-110 transition-all duration-300
          ${isOpen ? 'rotate-180' : ''}
        `}
        title="Soundboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      </button>

      {/* Soundboard Panel */}
      <div
        className={`
          fixed top-32 right-4 z-40
          bg-gradient-to-b from-kbc-purple-light to-kbc-purple
          border-2 border-kbc-gold rounded-xl shadow-[0_0_30px_rgba(255,215,0,0.4)]
          transition-all duration-300 overflow-hidden
          ${isOpen ? 'w-80 max-h-[600px] opacity-100' : 'w-0 max-h-0 opacity-0'}
        `}
      >
        <div className="p-4">
          {/* Header */}
          <div className="mb-4 pb-3 border-b-2 border-kbc-gold/30">
            <h3 className="text-xl font-bold text-kbc-gold text-center">
              🎵 Soundboard
            </h3>
            <p className="text-xs text-kbc-gold/70 text-center mt-1">
              Click to play • Overrides game sounds
            </p>
          </div>

          {/* Sound List */}
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
            {SOUND_FILES.map((sound) => {
              const isPlaying = playingAudio === sound.file;

              return (
                <div key={sound.file} className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (sound.type === 'audio') {
                        handlePlayAudio(sound.file);
                      } else {
                        handlePlayVideo(sound.file);
                      }
                    }}
                    className={`
                      flex-1 flex items-center gap-3 p-3 rounded-lg
                      border-2 transition-all duration-200
                      ${isPlaying
                        ? 'bg-kbc-gold border-kbc-gold-dark text-kbc-purple shadow-[0_0_15px_rgba(255,215,0,0.6)] scale-105'
                        : 'bg-kbc-purple-light/50 border-kbc-gold/30 text-white hover:border-kbc-gold hover:bg-kbc-purple-light hover:scale-102'
                      }
                    `}
                  >
                    <span className="text-2xl">{sound.icon}</span>
                    <div className="flex-1 text-left">
                      <div className={`font-semibold ${isPlaying ? 'text-kbc-purple' : 'text-white'}`}>
                        {sound.name}
                      </div>
                      <div className={`text-xs ${isPlaying ? 'text-kbc-purple/70' : 'text-gray-400'}`}>
                        {sound.type === 'video' ? 'Video' : 'Audio'}
                      </div>
                    </div>
                    {isPlaying && (
                      <div className="flex items-center gap-1 text-kbc-purple">
                        <div className="w-1 h-3 bg-kbc-purple animate-pulse"></div>
                        <div className="w-1 h-4 bg-kbc-purple animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-3 bg-kbc-purple animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                  </button>

                  {isPlaying && sound.type === 'audio' && (
                    <button
                      onClick={handleStopAudio}
                      className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                      title="Stop"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 215, 0, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 215, 0, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 215, 0, 0.7);
        }
      `}</style>
    </>
  );
}
