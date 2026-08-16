export default function SearchButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        px-3 py-1 m-1 rounded-md font-semibold whitespace-nowrap
        cursor-pointer transition-all duration-200

        bg-bg-card text-text-main border border-border-soft
        hover:bg-bg-hover-strong hover:text-accent-cyan hover:border-accent-cyan

        ${loading ? "opacity-60 cursor-not-allowed" : ""}
    `}
    >
      {loading ? "Analizando..." : "Analizar"}
    </button>
  );
}
