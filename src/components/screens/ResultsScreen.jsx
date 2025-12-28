import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { VideoPlayer } from '../common/VideoPlayer';
import { useGameState } from '../../hooks/useGameState';
import { useGameSound } from '../../contexts/SoundContext';

export function ResultsScreen() {
  const { leaderboard, winner, resetGame, replayWithSameTeams, players } = useGameState();
  const { play, stop } = useGameSound();
  const [showVideo, setShowVideo] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Play winner sound and show confetti after video is closed
  useEffect(() => {
    if (!showVideo) {
      // Play winner sound
      play('winner');
      // Show confetti
      setShowConfetti(true);

      // Stop confetti after 10 seconds
      const timer = setTimeout(() => setShowConfetti(false), 10000);

      return () => {
        clearTimeout(timer);
        stop('winner');
      };
    }
  }, [showVideo, play, stop]);

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  const getTeamPlayers = (team) => {
    return players.filter(p => team.playerIds.includes(p.id));
  };

  // Check for tie
  const topScore = winner?.score || 0;
  const winners = leaderboard.filter(team => team.score === topScore);
  const isTie = winners.length > 1;

  return (
    <>
      {/* Final Video */}
      {showVideo && (
        <VideoPlayer
          videoSrc="/sounds/final.mp4"
          onClose={handleCloseVideo}
          autoPlay={true}
        />
      )}

      <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Winner Announcement */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-4 animate-bounce-slow">
            🏆
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-4">
            {isTie ? "It's a Tie!" : `${winner?.name} Wins!`}
          </h1>
          <p className="text-3xl font-bold text-gray-700">
            {isTie
              ? `${winners.length} teams tied with ${topScore} point${topScore !== 1 ? 's' : ''}`
              : `${topScore} point${topScore !== 1 ? 's' : ''}`
            }
          </p>
        </div>

        {/* Leaderboard */}
        <Card className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Final Standings
          </h2>
          <div className="space-y-4">
            {leaderboard.map((team, index) => {
              const teamPlayers = getTeamPlayers(team);
              const isWinner = team.score === topScore;

              return (
                <div
                  key={team.id}
                  className={`
                    p-6 rounded-xl border-4 transition-all
                    ${isWinner
                      ? `${team.colorScheme.border} bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-xl`
                      : 'border-gray-200 bg-white'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`
                        text-4xl font-bold w-14 h-14 rounded-full flex items-center justify-center
                        ${isWinner ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-600'}
                      `}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${team.colorScheme.text}`}>
                          {team.name}
                        </h3>
                        <p className="text-gray-600">
                          {teamPlayers.map(p => p.name).join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-gray-800">
                        {team.score}
                      </div>
                      <p className="text-sm text-gray-600">
                        {team.questionsAnswered} question{team.questionsAnswered !== 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-gray-600">
                        {team.questionsAnswered > 0
                          ? `${((team.score / team.questionsAnswered) * 100).toFixed(0)}% accuracy`
                          : '0% accuracy'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            onClick={() => {
              play('click');
              replayWithSameTeams();
            }}
            variant="primary"
            className="text-2xl"
          >
            🔄 Play Again (Same Teams)
          </Button>
          <Button
            onClick={() => {
              play('click');
              resetGame();
            }}
            variant="secondary"
            className="text-2xl"
          >
            🏠 New Game
          </Button>
        </div>
      </div>
      </div>
    </>
  );
}
