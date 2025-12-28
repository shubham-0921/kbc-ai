/**
 * Sound Service - Manages all game sound effects
 *
 * SETUP INSTRUCTIONS:
 * 1. Download KBC sounds (see KBC_SOUND_SETUP.md)
 * 2. Place MP3 files in public/sounds/
 * 3. Set USE_LOCAL_SOUNDS = true below
 * 4. Reload the app!
 */

// ============================================
// CONFIGURATION: Which sounds to load locally
// ============================================
// Set a sound to 'true' if you have the file in public/sounds/
// Set to 'false' to use placeholder sounds
const LOCAL_SOUNDS_AVAILABLE = {
  theme: true,           // ✅ You have this file
  questionBed: true,     // ✅ You have this file
  suspense: true,        // ✅ You have this file - Suspense loop after question-bed
  timerTick: false,      // ⚠️ Using placeholder (add timer-tick.mp3 to enable)
  lock: true,            // ✅ You have this file - "Computer ji lock kiya jaye!"
  correct: false,        // ⚠️ Using placeholder (add correct.mp3 to enable)
  wrong: false,          // ⚠️ Using placeholder (add wrong.mp3 to enable)
  winner: true,          // ✅ You have this file
  click: false,          // ⚠️ Using placeholder (add click.mp3 to enable)
  phoneAFriend: true,    // ✅ You have this file - Phone a friend sound
  kbcCredits: true       // ✅ You have this file - Credits music
};

// Sound file paths
const SOUND_BASE_PATH = '/sounds/';

// Helper function to get sound URL
const getUrl = (soundKey, localFile, onlineUrl) => {
  return LOCAL_SOUNDS_AVAILABLE[soundKey] ? `${SOUND_BASE_PATH}${localFile}` : onlineUrl;
};

export const SOUNDS = {
  // Theme music - plays on home screen
  THEME: {
    key: 'theme',
    url: getUrl(
      'theme',
      'theme.mp3', // Local KBC file
      'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' // Placeholder
    ),
    volume: 0.3,
    loop: true
  },

  // Question music - plays while question is being answered
  QUESTION_BED: {
    key: 'questionBed',
    url: getUrl(
      'questionBed',
      'question-bed.mp3', // Local KBC file
      'https://assets.mixkit.co/active_storage/sfx/2462/2462-preview.mp3' // Placeholder
    ),
    volume: 0.2,
    loop: false // Plays once, then transitions to suspense
  },

  // Suspense music - plays on loop after question-bed ends
  SUSPENSE: {
    key: 'suspense',
    url: getUrl(
      'suspense',
      'suspense.mp3', // Local KBC suspense music
      'https://assets.mixkit.co/active_storage/sfx/2462/2462-preview.mp3' // Placeholder
    ),
    volume: 0.2,
    loop: true // Loops continuously
  },

  // Timer ticking - plays during countdown
  TIMER_TICK: {
    key: 'timerTick',
    url: getUrl(
      'timerTick',
      'timer-tick.mp3', // Local KBC file
      'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' // Placeholder
    ),
    volume: 0.4,
    loop: true
  },

  // Lock sound - plays when answer is locked
  LOCK: {
    key: 'lock',
    url: getUrl(
      'lock',
      'lock.mp3', // Local KBC "Computer ji lock kiya jaye" sound
      'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3' // Placeholder
    ),
    volume: 0.5,
    loop: false
  },

  // Correct answer - plays when answer is correct
  CORRECT: {
    key: 'correct',
    url: getUrl(
      'correct',
      'correct.mp3', // Local KBC file
      'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3' // Placeholder
    ),
    volume: 0.6,
    loop: false
  },

  // Wrong answer - plays when answer is incorrect
  WRONG: {
    key: 'wrong',
    url: getUrl(
      'wrong',
      'wrong.mp3', // Local KBC file
      'https://assets.mixkit.co/active_storage/sfx/1788/1788-preview.mp3' // Placeholder
    ),
    volume: 0.5,
    loop: false
  },

  // Winner celebration - plays on results screen
  WINNER: {
    key: 'winner',
    url: getUrl(
      'winner',
      'winner.mp3', // Local KBC file
      'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3' // Placeholder
    ),
    volume: 0.7,
    loop: false
  },

  // Click/button sound
  CLICK: {
    key: 'click',
    url: getUrl(
      'click',
      'click.mp3', // Local KBC file
      'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3' // Placeholder
    ),
    volume: 0.3,
    loop: false
  },

  // Phone a Friend sound
  PHONE_A_FRIEND: {
    key: 'phoneAFriend',
    url: getUrl(
      'phoneAFriend',
      'phone_a_friend.mp3', // Local KBC file
      'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3' // Placeholder
    ),
    volume: 0.5,
    loop: false
  },

  // KBC Credits music
  KBC_CREDITS: {
    key: 'kbcCredits',
    url: getUrl(
      'kbcCredits',
      'kbc_credits.mp3', // Local KBC credits music
      'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' // Placeholder
    ),
    volume: 0.4,
    loop: true
  }
};

/**
 * Preload all sounds
 * Call this on app initialization to cache audio files
 */
export function preloadSounds() {
  Object.values(SOUNDS).forEach(sound => {
    const audio = new Audio(sound.url);
    audio.preload = 'auto';
  });
}

/**
 * Create an audio element for a sound
 * @param {Object} sound - Sound configuration object
 * @returns {HTMLAudioElement}
 */
export function createAudioElement(sound) {
  const audio = new Audio(sound.url);
  audio.volume = sound.volume;
  audio.loop = sound.loop;
  audio.preload = 'auto';
  return audio;
}

/**
 * Play a sound with optional override settings
 * @param {HTMLAudioElement} audioElement - The audio element to play
 * @param {Object} options - Optional override settings
 */
export function playSound(audioElement, options = {}) {
  if (!audioElement) return;

  try {
    audioElement.currentTime = 0;
    if (options.volume !== undefined) {
      audioElement.volume = options.volume;
    }
    if (options.loop !== undefined) {
      audioElement.loop = options.loop;
    }

    audioElement.play().catch(err => {
      console.warn('Failed to play sound:', err);
    });
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

/**
 * Stop a sound
 * @param {HTMLAudioElement} audioElement - The audio element to stop
 */
export function stopSound(audioElement) {
  if (!audioElement) return;

  try {
    audioElement.pause();
    audioElement.currentTime = 0;
  } catch (error) {
    console.error('Error stopping sound:', error);
  }
}
