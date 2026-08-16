import ShieldSVG from "../../assets/shield.svg?react";

export default function SecurityScoreBadge({ score }) {
  const level =
    score >= 8 ? "safe" :
    score >= 5 ? "warn" :
    "critical";

  const color =
    level === "safe"
      ? "text-green-500"
      : level === "warn"
        ? "text-yellow-400"
        : "text-red-500";

  const glow =
    level === "safe"
      ? "drop-shadow-[0_0_20px_var(--green-safe)]"
      : "";

  const pulse =
    level === "critical"
      ? "animate-pulse"
      : "";

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <ShieldSVG
        className={`
          w-full h-full
          ${color}
          ${glow}
          ${pulse}
        `}
      />

      <span className="absolute text-3xl font-extrabold text-black drop-shadow-lg">
        {score}/10
      </span>
    </div>
  );
}
