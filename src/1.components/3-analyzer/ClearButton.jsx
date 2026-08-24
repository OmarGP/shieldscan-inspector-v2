export default function ClearButton({ onClick, className }) {
    
  return (
    <button
      onClick={onClick}
      className={`
        bg-bg-card
        border border-border-soft
        rounded-lg px-3 py-1 mb-1
        text-text-main
        hover:bg-bg-hover-strong
        hover:text-accent-cyan
        hover:border-accent-cyan
        transition-all duration-200
        ${className}
      `}
    >
      Borrar
    </button>
  );
}
