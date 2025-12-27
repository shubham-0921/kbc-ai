export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-gradient-to-br from-kbc-purple-light to-kbc-purple border-2 border-kbc-gold/30 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.1)] p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
