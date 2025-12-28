import { useEffect, useRef } from 'react';

export function VideoPlayer({ videoSrc, onClose, autoPlay = true }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(err => {
        console.warn('Failed to autoplay video:', err);
      });
    }
  }, [autoPlay]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-60 bg-red-500 hover:bg-red-600 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-[0_0_30px_rgba(239,68,68,0.6)] group"
        aria-label="Close video"
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
        <span className="absolute -bottom-10 right-0 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Press to continue
        </span>
      </button>

      {/* Video Container */}
      <div className="relative w-full max-w-4xl mx-4 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.5)]">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-auto"
          controls
          playsInline
          loop
        />
      </div>

      {/* Hint text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-lg animate-pulse">
        Click the ✕ button to continue
      </div>
    </div>
  );
}
