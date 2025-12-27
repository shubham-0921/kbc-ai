export function QuestionDisplay({ question }) {
  if (!question) return null;

  return (
    <div className="max-w-5xl mx-auto mb-8">
      {/* Question amount display (KBC style) */}
      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-r from-kbc-gold to-kbc-gold-dark px-8 py-3 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)] border-2 border-yellow-400">
          <p className="text-sm font-bold text-kbc-purple uppercase tracking-wider">
            ₹ {(Math.random() * 9 + 1).toFixed(0)},00,000 KA SAWAAL
          </p>
        </div>
      </div>

      {/* Topic Badge */}
      <div className="text-center mb-4">
        <span className="inline-block px-6 py-2 bg-kbc-purple-light rounded-full border border-kbc-gold/50 shadow-lg">
          <p className="text-sm font-bold text-kbc-gold uppercase tracking-wide">
            📚 {question.topic}
          </p>
        </span>
      </div>

      {/* Question Box - KBC Style */}
      <div className="relative bg-gradient-to-br from-kbc-purple-light to-kbc-purple border-2 border-kbc-gold rounded-xl p-8 shadow-[0_0_40px_rgba(255,215,0,0.2)]">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-kbc-gold rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-kbc-gold rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-kbc-gold rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-kbc-gold rounded-br-lg"></div>

        {/* Question Text */}
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            {question.question}
          </h2>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 mb-6 flex items-center justify-center gap-4">
        <div className="h-px bg-gradient-to-r from-transparent via-kbc-gold to-transparent flex-1"></div>
        <span className="text-kbc-gold text-sm font-bold">JAWAAB</span>
        <div className="h-px bg-gradient-to-r from-transparent via-kbc-gold to-transparent flex-1"></div>
      </div>
    </div>
  );
}
