import { useState } from 'react';
import { Button } from '../common/Button';
import { ANSWER_LABELS } from '../../utils/constants';

export function AnswerOptions({ options, onSubmit, disabled = false }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      onSubmit(selectedIndex);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* KBC Style Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !disabled && setSelectedIndex(index)}
            disabled={disabled}
            className={`
              group relative p-6 rounded-lg text-left transition-all duration-300
              ${selectedIndex === index
                ? 'bg-gradient-to-r from-kbc-gold to-kbc-gold-dark shadow-[0_0_30px_rgba(255,215,0,0.6)] scale-105'
                : 'bg-gradient-to-r from-kbc-purple-light to-kbc-purple border-2 border-kbc-gold/30 hover:border-kbc-gold hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]'
              }
              ${disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-4">
              {/* KBC Diamond Label */}
              <div className={`
                relative w-12 h-12 flex items-center justify-center flex-shrink-0 transform rotate-45 transition-all
                ${selectedIndex === index
                  ? 'bg-kbc-purple border-2 border-kbc-purple'
                  : 'bg-kbc-gold border-2 border-kbc-gold-dark'
                }
              `}>
                <span className={`
                  transform -rotate-45 font-bold text-xl
                  ${selectedIndex === index ? 'text-kbc-gold' : 'text-kbc-purple'}
                `}>
                  {ANSWER_LABELS[index]}
                </span>
              </div>

              {/* Option Text */}
              <div className="flex-1">
                <p className={`
                  text-lg md:text-xl font-semibold transition-all
                  ${selectedIndex === index ? 'text-kbc-purple' : 'text-white'}
                `}>
                  {option}
                </p>
              </div>

              {/* Selection indicator */}
              {selectedIndex === index && (
                <div className="flex-shrink-0 text-kbc-purple text-2xl animate-pulse">
                  ✓
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lock Kiya Jaye Button */}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={selectedIndex === null || disabled}
          variant="success"
          className="px-16 py-6 text-2xl shadow-[0_0_30px_rgba(0,255,0,0.3)]"
        >
          {selectedIndex !== null ? '🔒 LOCK KIYA JAYE' : 'KRIPYA JAWAB CHUNIYE'}
        </Button>
      </div>

      {/* KBC tagline */}
      {selectedIndex !== null && (
        <div className="text-center mt-4 text-kbc-gold/70 italic animate-pulse">
          "Computer ji, lock kiya jaye!"
        </div>
      )}
    </div>
  );
}
