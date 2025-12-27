export function Timer({ timeLeft, duration, className = '' }) {
  const percentage = (timeLeft / duration) * 100;

  const getColor = () => {
    if (percentage > 66) return 'text-green-500 border-green-500';
    if (percentage > 33) return 'text-yellow-500 border-yellow-500';
    return 'text-red-500 border-red-500';
  };

  const getProgressColor = () => {
    if (percentage > 66) return 'stroke-green-500';
    if (percentage > 33) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  // Calculate circle progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-gray-200"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            className={`${getProgressColor()} transition-all duration-100`}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        {/* Time text */}
        <div className={`absolute inset-0 flex items-center justify-center font-bold text-4xl ${getColor()}`}>
          {Math.ceil(timeLeft)}
        </div>
      </div>
      <p className="mt-2 text-gray-600 text-sm font-semibold">seconds</p>
    </div>
  );
}
