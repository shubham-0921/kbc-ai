import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { SOUNDS, createAudioElement } from '../services/soundService';

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(() => {
    // Load mute preference from localStorage
    const saved = localStorage.getItem('kbc-sound-muted');
    return saved === 'true';
  });

  const audioElements = useRef({});

  // Initialize all audio elements
  useEffect(() => {
    Object.values(SOUNDS).forEach(sound => {
      audioElements.current[sound.key] = createAudioElement(sound);
    });

    return () => {
      // Cleanup: stop all sounds when component unmounts
      Object.values(audioElements.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  // Save mute preference to localStorage
  useEffect(() => {
    localStorage.setItem('kbc-sound-muted', isMuted);
  }, [isMuted]);

  /**
   * Play a sound by key
   * @param {string} soundKey - The key of the sound to play (from SOUNDS)
   * @param {Object} options - Optional override settings
   */
  const play = (soundKey, options = {}) => {
    if (isMuted) return;

    const audio = audioElements.current[soundKey];
    if (!audio) {
      console.warn(`Sound ${soundKey} not found`);
      return;
    }

    try {
      audio.currentTime = 0;
      if (options.volume !== undefined) {
        audio.volume = options.volume;
      }
      if (options.loop !== undefined) {
        audio.loop = options.loop;
      }

      audio.play().catch(err => {
        console.warn(`Failed to play sound ${soundKey}:`, err);
      });
    } catch (error) {
      console.error(`Error playing sound ${soundKey}:`, error);
    }
  };

  /**
   * Play a sound with a callback when it ends
   * @param {string} soundKey - The key of the sound to play
   * @param {Function} onEnded - Callback function when sound ends
   * @param {Object} options - Optional override settings
   */
  const playWithCallback = (soundKey, onEnded, options = {}) => {
    if (isMuted) return;

    const audio = audioElements.current[soundKey];
    if (!audio) {
      console.warn(`Sound ${soundKey} not found`);
      return;
    }

    try {
      // Remove any existing ended listeners
      audio.onended = null;

      audio.currentTime = 0;
      if (options.volume !== undefined) {
        audio.volume = options.volume;
      }
      if (options.loop !== undefined) {
        audio.loop = options.loop;
      }

      // Add ended listener
      audio.onended = () => {
        if (onEnded && typeof onEnded === 'function') {
          onEnded();
        }
      };

      audio.play().catch(err => {
        console.warn(`Failed to play sound ${soundKey}:`, err);
      });
    } catch (error) {
      console.error(`Error playing sound ${soundKey}:`, error);
    }
  };

  /**
   * Stop a sound by key
   * @param {string} soundKey - The key of the sound to stop
   */
  const stop = (soundKey) => {
    const audio = audioElements.current[soundKey];
    if (!audio) return;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.onended = null; // Clear any ended listeners
    } catch (error) {
      console.error(`Error stopping sound ${soundKey}:`, error);
    }
  };

  /**
   * Stop all playing sounds
   */
  const stopAll = () => {
    Object.values(audioElements.current).forEach(audio => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (error) {
        console.error('Error stopping sound:', error);
      }
    });
  };

  /**
   * Toggle mute state
   */
  const toggleMute = () => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (newMuted) {
        stopAll();
      }
      return newMuted;
    });
  };

  const value = {
    play,
    playWithCallback,
    stop,
    stopAll,
    isMuted,
    toggleMute,
    SOUND_KEYS: Object.values(SOUNDS).reduce((acc, sound) => {
      acc[sound.key.toUpperCase()] = sound.key;
      return acc;
    }, {})
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

/**
 * Hook to access sound context
 */
export function useGameSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useGameSound must be used within SoundProvider');
  }
  return context;
}
