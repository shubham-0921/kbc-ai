import { STORAGE_KEYS } from '../utils/constants';

/**
 * Save game state to localStorage
 * @param {Object} state - Game state to save
 */
export function saveGameState(state) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, serialized);
    return true;
  } catch (error) {
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
      // Try to clear old data and retry
      clearGameState();
      try {
        localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(state));
        return true;
      } catch (retryError) {
        console.error('Failed to save game state after clearing:', retryError);
        return false;
      }
    }
    console.error('Failed to save game state:', error);
    return false;
  }
}

/**
 * Load game state from localStorage
 * @returns {Object|null} Game state or null if not found
 */
export function loadGameState() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    if (!serialized) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Failed to load game state:', error);
    // If corrupted, clear it
    clearGameState();
    return null;
  }
}

/**
 * Clear game state from localStorage
 */
export function clearGameState() {
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
    return true;
  } catch (error) {
    console.error('Failed to clear game state:', error);
    return false;
  }
}

/**
 * Check if saved game state exists
 * @returns {boolean}
 */
export function hasSavedGame() {
  return localStorage.getItem(STORAGE_KEYS.GAME_STATE) !== null;
}
