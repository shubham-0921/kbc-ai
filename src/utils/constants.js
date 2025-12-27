// Topics for trivia questions
export const TOPICS = [
  'Bollywood & Indian Cinema',
  'Cricket & Indian Sports',
  'Indian History & Freedom Struggle',
  'Indian Politics & Current Affairs 2024-25',
  'Alcohol & Cocktails',
  'Indian Street Food',
  'Tech & Startups in India',
  'Indian Geography & Travel',
  'Indian Mythology & Religion',
  'IPL & Sports Leagues',
  'Indian Music & Indie Artists',
  'Memes & Internet Culture',
  'Indian Web Series & OTT',
  'Desi Party Games',
  'Indian Festivals & Traditions',
  'Chai, Coffee & Beverages',
  'Indian Economy & Business',
  'Viral News & Trending Topics 2024',
  'Indian Literature & Authors',
  'Desi Slang & Regional Languages'
];

// Team colors with Tailwind classes
export const TEAM_COLORS = [
  {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    border: 'border-blue-500',
    hoverBg: 'hover:bg-blue-600',
    name: 'Blue'
  },
  {
    bg: 'bg-red-500',
    text: 'text-red-500',
    border: 'border-red-500',
    hoverBg: 'hover:bg-red-600',
    name: 'Red'
  },
  {
    bg: 'bg-green-500',
    text: 'text-green-500',
    border: 'border-green-500',
    hoverBg: 'hover:bg-green-600',
    name: 'Green'
  },
  {
    bg: 'bg-purple-500',
    text: 'text-purple-500',
    border: 'border-purple-500',
    hoverBg: 'hover:bg-purple-600',
    name: 'Purple'
  },
  {
    bg: 'bg-orange-500',
    text: 'text-orange-500',
    border: 'border-orange-500',
    hoverBg: 'hover:bg-orange-600',
    name: 'Orange'
  },
  {
    bg: 'bg-pink-500',
    text: 'text-pink-500',
    border: 'border-pink-500',
    hoverBg: 'hover:bg-pink-600',
    name: 'Pink'
  }
];

// Game configuration defaults
export const DEFAULT_CONFIG = {
  questionsPerTeam: 5,
  timerLength: 30, // seconds
  minPlayers: 2,
  minTeams: 2,
  maxTeams: 6,
  minQuestionsPerTeam: 1
};

// Game phases
export const GAME_PHASES = {
  HOME: 'home',
  SETUP: 'setup',
  TEAM_DISPLAY: 'teamDisplay',
  PLAYING: 'playing',
  RESULTS: 'results'
};

// Turn phases within gameplay
export const TURN_PHASES = {
  TOPIC_SELECTION: 'topicSelection',
  ANSWERING: 'answering',
  REVEAL: 'reveal'
};

// Answer option labels
export const ANSWER_LABELS = ['A', 'B', 'C', 'D'];

// LocalStorage keys
export const STORAGE_KEYS = {
  GAME_STATE: 'trivia_battle_arena_game_state'
};
