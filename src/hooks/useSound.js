import { useRef, useCallback, useState } from 'react';

/**
 * Custom hook for managing game sounds
 * Provides methods to play different KBC-themed sound effects
 */
export function useSound() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRefs = useRef({});

  /**
   * Play a sound with volume control
   * @param {string} soundKey - Identifier for the sound
   * @param {number} volume - Volume level (0-1)
   * @param {boolean} loop - Whether to loop the sound
   */
  const play = useCallback((soundKey, volume = 0.5, loop = false) => {
    if (isMuted) return;

    try {
      // Stop any existing instance of this sound
      if (audioRefs.current[soundKey]) {
        audioRefs.current[soundKey].pause();
        audioRefs.current[soundKey].currentTime = 0;
      }

      const audio = audioRefs.current[soundKey];
      if (audio) {
        audio.volume = volume;
        audio.loop = loop;
        audio.play().catch(err => {
          console.warn(`Failed to play sound ${soundKey}:`, err);
        });
      }
    } catch (error) {
      console.error(`Error playing sound ${soundKey}:`, error);
    }
  }, [isMuted]);

  /**
   * Stop a playing sound
   * @param {string} soundKey - Identifier for the sound
   */
  const stop = useCallback((soundKey) => {
    if (audioRefs.current[soundKey]) {
      audioRefs.current[soundKey].pause();
      audioRefs.current[soundKey].currentTime = 0;
    }
  }, []);

  /**
   * Stop all playing sounds
   */
  const stopAll = useCallback(() => {
    Object.keys(audioRefs.current).forEach(key => {
      if (audioRefs.current[key]) {
        audioRefs.current[key].pause();
        audioRefs.current[key].currentTime = 0;
      }
    });
  }, []);

  /**
   * Register audio elements
   * @param {string} soundKey - Identifier for the sound
   * @param {HTMLAudioElement} audioElement - The audio element
   */
  const registerAudio = useCallback((soundKey, audioElement) => {
    audioRefs.current[soundKey] = audioElement;
  }, []);

  /**
   * Toggle mute state
   */
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (newMuted) {
        stopAll();
      }
      return newMuted;
    });
  }, [stopAll]);

  return {
    play,
    stop,
    stopAll,
    registerAudio,
    isMuted,
    toggleMute
  };
}
