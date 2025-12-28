import { useState, useEffect, useRef } from 'react';
import { useGameSound } from '../../contexts/SoundContext';
import { ANSWER_LABELS } from '../../utils/constants';

export function Lifelines({
  lifelines,
  audiencePollResults,
  onPhoneAFriend,
  onAudiencePoll,
  currentQuestion
}) {
  const { play, stopAll } = useGameSound();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedResults, setAnimatedResults] = useState([0, 0, 0, 0]);
  const animationInterval = useRef(null);
  const animationTimeout = useRef(null);

  const handlePhoneAFriend = () => {
    stopAll(); // Stop all other sounds
    play('phoneAFriend');
    onPhoneAFriend();
  };

  const handleAudiencePoll = () => {
    play('click');
    setIsAnimating(true);

    // Start animation with random moving bars
    animationInterval.current = setInterval(() => {
      const randomPercentages = [0, 0, 0, 0].map(() => Math.floor(Math.random() * 100));
      const sum = randomPercentages.reduce((a, b) => a + b, 0);
      const normalized = randomPercentages.map(p => Math.round((p / sum) * 100));

      // Ensure sum is 100
      const actualSum = normalized.reduce((a, b) => a + b, 0);
      if (actualSum !== 100) {
        normalized[0] += (100 - actualSum);
      }

      setAnimatedResults(normalized);
    }, 400); // Update every 400ms (slower)

    // Stop animation after 5 seconds and show final results
    animationTimeout.current = setTimeout(() => {
      clearInterval(animationInterval.current);
      setIsAnimating(false);
      onAudiencePoll();
    }, 5000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, []);

  // Reset animation when poll results change
  useEffect(() => {
    if (!audiencePollResults) {
      setIsAnimating(false);
      setAnimatedResults([0, 0, 0, 0]);
    }
  }, [audiencePollResults]);

  return (
    <div className="mb-6">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-center text-kbc-gold text-lg font-bold mb-3">
          Lifelines
        </h3>

        {/* Lifeline Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {/* Phone a Friend */}
          <button
            onClick={handlePhoneAFriend}
            disabled={lifelines.phoneAFriend}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg
              transition-all duration-300 border-2
              ${lifelines.phoneAFriend
                ? 'bg-gray-600 border-gray-700 text-gray-400 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400 text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]'
              }
            `}
          >
            <span className="text-2xl">📞</span>
            <div className="text-left">
              <div>Phone a Friend</div>
              {lifelines.phoneAFriend && (
                <div className="text-xs">Used</div>
              )}
            </div>
          </button>

          {/* Audience Poll */}
          <button
            onClick={handleAudiencePoll}
            disabled={lifelines.audiencePoll}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg
              transition-all duration-300 border-2
              ${lifelines.audiencePoll
                ? 'bg-gray-600 border-gray-700 text-gray-400 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400 text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]'
              }
            `}
          >
            <span className="text-2xl">👥</span>
            <div className="text-left">
              <div>Audience Poll</div>
              {lifelines.audiencePoll && (
                <div className="text-xs">Used</div>
              )}
            </div>
          </button>
        </div>

        {/* Audience Poll Results */}
        {(isAnimating || (audiencePollResults && lifelines.audiencePoll)) && (
          <div className="bg-gradient-to-r from-kbc-purple-light to-kbc-purple border-2 border-kbc-gold rounded-xl p-6 shadow-[0_0_20px_rgba(255,215,0,0.3)] animate-fadeIn">
            <h4 className="text-center text-kbc-gold font-bold text-xl mb-4 flex items-center justify-center gap-2">
              <span>👥</span>
              {isAnimating ? 'Audience is Voting...' : 'Audience Poll Results'}
              <span>👥</span>
            </h4>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const displayResults = isAnimating ? animatedResults : audiencePollResults;
                const percentage = displayResults[index];
                const isHighest = !isAnimating && percentage === Math.max(...audiencePollResults);

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <span className={`
                          inline-block w-8 h-8 rounded-full flex items-center justify-center font-bold
                          transition-all duration-300
                          ${isHighest && !isAnimating ? 'bg-kbc-gold text-kbc-purple' : 'bg-kbc-purple-light text-white'}
                        `}>
                          {ANSWER_LABELS[index]}
                        </span>
                        <span className="text-sm line-clamp-1">{option}</span>
                      </div>
                      <span className={`font-bold text-lg transition-all duration-300 ${isHighest && !isAnimating ? 'text-kbc-gold' : 'text-white'}`}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-kbc-purple-light rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isAnimating ? 'duration-300' : 'duration-1000'
                        } ${
                          isHighest && !isAnimating
                            ? 'bg-gradient-to-r from-kbc-gold to-kbc-gold-dark'
                            : 'bg-gradient-to-r from-purple-500 to-purple-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {isAnimating ? (
              <p className="text-center text-kbc-gold/70 text-sm mt-4 italic animate-pulse">
                📊 Tallying votes...
              </p>
            ) : (
              <p className="text-center text-kbc-gold/70 text-sm mt-4 italic">
                The audience has voted! But are they right? 🤔
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
