export function HotSeatIndicator({ playerName }) {
  if (!playerName) return null;

  return (
    <div className="mb-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-kbc-purple-light to-kbc-purple border-2 border-kbc-gold rounded-xl p-6 shadow-[0_0_30px_rgba(255,215,0,0.4)]">
        <div className="flex items-center justify-center gap-4">
          {/* Hot seat icon */}
          <div className="text-5xl animate-pulse-slow">🪑</div>

          {/* Text */}
          <div className="text-center">
            <p className="text-kbc-gold/80 text-sm uppercase tracking-wider mb-1">
              On the Hot Seat
            </p>
            <p className="text-3xl md:text-4xl font-display font-bold text-kbc-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]">
              {playerName}
            </p>
            <p className="text-white/70 text-lg mt-1 italic">
              with Amit-Ji
            </p>
          </div>

          {/* Microphone icon */}
          <div className="text-5xl animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
            🎤
          </div>
        </div>
      </div>
    </div>
  );
}
