import { v4 as uuidv4 } from 'uuid';
import { TEAM_COLORS, TEAM_NAMES } from '../utils/constants';

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Create teams from players with random distribution
 * @param {Array} players - Array of player objects {id, name}
 * @param {number} numTeams - Number of teams to create
 * @returns {Array} Array of team objects
 */
export function createTeams(players, numTeams) {
  if (!players || players.length < 2) {
    throw new Error('At least 2 players required');
  }

  if (numTeams < 2 || numTeams > 6) {
    throw new Error('Number of teams must be between 2 and 6');
  }

  // Shuffle players for random distribution
  const shuffledPlayers = shuffleArray(players);

  // Initialize teams
  const teams = [];
  for (let i = 0; i < numTeams; i++) {
    const colorScheme = TEAM_COLORS[i % TEAM_COLORS.length];
    const teamName = TEAM_NAMES[i % TEAM_NAMES.length];
    teams.push({
      id: uuidv4(),
      name: teamName,
      colorScheme: colorScheme,
      playerIds: [],
      score: 0,
      questionsAnswered: 0
    });
  }

  // Distribute players evenly across teams
  shuffledPlayers.forEach((player, index) => {
    const teamIndex = index % numTeams;
    teams[teamIndex].playerIds.push(player.id);
    // Update player's teamId
    player.teamId = teams[teamIndex].id;
  });

  return teams;
}

/**
 * Shuffle teams - redistribute players randomly
 * @param {Array} players - Array of player objects
 * @param {number} numTeams - Number of teams
 * @returns {Array} New array of team objects with shuffled players
 */
export function shuffleTeams(players, numTeams) {
  // Reset player teamIds
  players.forEach(player => player.teamId = null);

  // Create new teams with shuffled distribution
  return createTeams(players, numTeams);
}

/**
 * Get players for a specific team
 * @param {string} teamId - Team ID
 * @param {Array} players - Array of all players
 * @returns {Array} Array of players in the team
 */
export function getTeamPlayers(teamId, players) {
  return players.filter(player => player.teamId === teamId);
}

/**
 * Calculate team statistics
 * @param {Object} team - Team object
 * @param {Array} players - Array of all players
 * @returns {Object} Team stats
 */
export function getTeamStats(team, players) {
  const teamPlayers = getTeamPlayers(team.id, players);
  return {
    playerCount: teamPlayers.length,
    score: team.score,
    questionsAnswered: team.questionsAnswered,
    averageScore: team.questionsAnswered > 0
      ? (team.score / team.questionsAnswered * 100).toFixed(1)
      : 0
  };
}
