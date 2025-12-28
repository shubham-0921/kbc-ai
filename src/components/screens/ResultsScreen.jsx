import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { VideoPlayer } from '../common/VideoPlayer';
import { useGameState } from '../../hooks/useGameState';
import { useGameSound } from '../../contexts/SoundContext';

export function ResultsScreen() {
  const { leaderboard, winner, resetGame, replayWithSameTeams, players } = useGameState();
  const { play, stop, stopAll } = useGameSound();
  const [showVideo, setShowVideo] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
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

  const handleFinishGame = () => {
    stopAll(); // Stop all other sounds
    play('kbcCredits');
    setShowCredits(true);
  };

  const handleCloseCredits = () => {
    stop('kbcCredits');
    setShowCredits(false);
  };

  const getTeamPlayers = (team) => {
    return players.filter(p => team.playerIds.includes(p.id));
  };

  // Check for tie
  const topScore = winner?.score || 0;
  const winners = leaderboard.filter(team => team.score === topScore);
  const isTie = winners.length > 1;

  // Show credits page if credits are active
  if (showCredits) {
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

        {/* Credits Page */}
        <div className="min-h-screen bg-gradient-to-b from-kbc-purple via-kbc-purple-light to-kbc-purple overflow-hidden relative">
          {/* Close Button */}
          <button
            onClick={handleCloseCredits}
            className="fixed top-6 right-6 z-50 bg-kbc-gold hover:bg-kbc-gold-dark text-kbc-purple rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-[0_0_30px_rgba(255,215,0,0.6)]"
            aria-label="Close credits"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Scrolling Credits */}
          <div className="credits-scroll relative z-10">
            <div className="credits-content">
            <div className="text-center space-y-16 py-20">
              {/* Main Title */}
              <div className="space-y-4 mb-32">
                <div className="text-8xl animate-bounce-slow mb-8">🏆</div>
                <h1 className="text-6xl md:text-7xl font-display font-bold text-kbc-gold drop-shadow-[0_0_40px_rgba(255,215,0,0.6)]">
                  KAUN BANEGA CROREPATI
                </h1>
                <p className="text-2xl text-kbc-gold/80 italic">
                  "Computer ji, lock kiya jaye!"
                </p>
              </div>

              {/* Created By */}
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white/60 uppercase tracking-wider">Created By</h2>
                <div className="space-y-3">
                  <p className="text-7xl font-display font-bold text-kbc-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]">Shubham</p>
                  <p className="text-7xl font-display font-bold text-kbc-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]">Amit</p>
                </div>
              </div>

              {/* Game Development */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white/60 uppercase tracking-wider">Game Development</h2>
                <p className="text-5xl font-bold text-white">Shubham Singhal</p>
                <p className="text-2xl text-white/70">Lead Developer</p>
              </div>

              {/* Game Design */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white/60 uppercase tracking-wider">Game Design</h2>
                <p className="text-5xl font-bold text-white">Amit Mishra</p>
                <p className="text-2xl text-white/70">Creative Director</p>
              </div>

              {/* AI Integration */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white/60 uppercase tracking-wider">AI Integration</h2>
                <p className="text-4xl font-bold text-white">Anthropic Claude</p>
                <p className="text-xl text-white/70">Question Generation Engine</p>
              </div>

              {/* Sound Design */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white/60 uppercase tracking-wider">Sound Design</h2>
                <p className="text-4xl font-bold text-white">Shubham & Amit</p>
                <p className="text-xl text-white/70">Audio Integration</p>
              </div>

              {/* UI/UX Design */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white/60 uppercase tracking-wider">UI/UX Design</h2>
                <p className="text-4xl font-bold text-white">Shubham Singhal</p>
                <p className="text-xl text-white/70">Interface Design</p>
              </div>

              {/* Testing */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white/60 uppercase tracking-wider">Quality Assurance</h2>
                <p className="text-4xl font-bold text-white">Amit Mishra</p>
                <p className="text-xl text-white/70">Game Testing</p>
              </div>

              {/* Special Thanks */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white/60 uppercase tracking-wider">Special Thanks</h2>
                <p className="text-3xl text-white">Sony Pictures Networks India</p>
                <p className="text-2xl text-white/70">For the inspiration</p>
              </div>

              {/* Technology */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white/60 uppercase tracking-wider">Built With</h2>
                <p className="text-3xl text-white">React • Vite • Tailwind CSS</p>
                <p className="text-3xl text-white">Anthropic Claude API</p>
              </div>

              {/* Final Message */}
              <div className="space-y-8 mt-32 mb-20">
                <div className="text-6xl">🎮</div>
                <h2 className="text-5xl font-display font-bold text-kbc-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]">
                  Thank You For Playing!
                </h2>
                <p className="text-2xl text-white/80">
                  © 2025 • Made with ❤️ in India
                </p>
                <button
                  onClick={handleCloseCredits}
                  className="mt-12 px-16 py-5 bg-gradient-to-r from-kbc-gold to-kbc-gold-dark text-kbc-purple font-bold text-2xl rounded-lg border-2 border-yellow-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                >
                  Back to Results
                </button>
              </div>
            </div>
            </div>
          </div>

          {/* CSS for scrolling animation */}
          <style>{`
            .credits-scroll {
              position: relative;
              overflow: hidden;
              height: 100vh;
            }

            .credits-content {
              animation: scroll-up 90s linear infinite;
              will-change: transform;
              transform: translateZ(0);
            }

            @keyframes scroll-up {
              0% {
                transform: translateY(100vh);
              }
              100% {
                transform: translateY(calc(-100% - 100vh));
              }
            }
          `}</style>
        </div>
      </>
    );
  }

  // Show results page
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
          <Button
            onClick={handleFinishGame}
            variant="secondary"
            className="text-2xl bg-gradient-to-r from-kbc-gold to-kbc-gold-dark text-kbc-purple border-2 border-kbc-gold-dark hover:scale-105"
          >
            ✨ Finish Game
          </Button>
        </div>
      </div>
      </div>
    </>
  );
}
