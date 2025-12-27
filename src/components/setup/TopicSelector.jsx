import { useState } from 'react';
import { Card } from '../common/Card';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { TOPICS } from '../../utils/constants';

export function TopicSelector({ availableTopics, onSelectTopic }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTopicClick = async (topic) => {
    setLoading(true);
    setError(null);
    try {
      await onSelectTopic(topic);
    } catch (err) {
      console.error('Topic selection error:', err);
      setError(err.message || 'Failed to generate question');
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    // This would be handled by parent component
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner message="Generating your trivia question..." />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Topic</h2>
        <p className="text-lg text-gray-600">Select a category for your question</p>
      </div>

      {error && (
        <Card className="mb-6 bg-red-50 border-2 border-red-300">
          <div className="text-center">
            <p className="text-red-800 font-semibold mb-3">
              Failed to generate question: {error}
            </p>
            <button
              onClick={handleRefresh}
              className="text-red-600 underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {TOPICS.map((topic) => {
          const isAvailable = availableTopics.includes(topic);
          return (
            <button
              key={topic}
              onClick={() => isAvailable && handleTopicClick(topic)}
              disabled={!isAvailable}
              className={`
                p-4 rounded-lg font-bold text-center transition-all shadow-md
                ${isAvailable
                  ? 'bg-white text-gray-800 hover:bg-game-primary hover:text-white hover:scale-105 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                }
              `}
            >
              {topic}
            </button>
          );
        })}
      </div>

      {availableTopics.length === 0 && (
        <div className="text-center mt-6">
          <p className="text-gray-600">All topics used! Topics will refresh for the next round.</p>
        </div>
      )}
    </div>
  );
}
