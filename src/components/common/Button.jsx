export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  const baseStyles = 'px-8 py-4 font-bold text-xl rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[60px] flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-gradient-to-r from-kbc-gold to-kbc-gold-dark text-kbc-purple border-2 border-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] active:scale-95',
    secondary: 'bg-kbc-purple-light text-kbc-gold border-2 border-kbc-gold/50 hover:border-kbc-gold hover:bg-kbc-purple active:scale-95',
    danger: 'bg-red-600 text-white border-2 border-red-400 hover:bg-red-700 active:scale-95',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-green-400 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] active:scale-95'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
