// Tarjeta individual de seguridad.
// Representa una cabecera analizada (HSTS, CSP, XFO, etc.).
// Usa props para ser reutilizable y flexible.

import { useState } from "react";
import StatusIndicator from "./StatusIndicator";

export default function SecurityCard({ title, status, description }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="
        bg-bg-card
        border border-border-soft
        rounded-lg
        p-4
        flex flex-col
        gap-2
        transition-all duration-200
        hover:bg-bg-hover-strong
        hover:border-accent-cyan
        hover:shadow-md
      "
    >
      {/* Fila superior: título + indicador + botón */}
      <div className="flex items-center justify-between">
        
        {/* Título */}
        <h3 className="text-base font-semibold text-text-main">
          {title}
        </h3>

        {/* Indicador de estado */}
        <div className="flex items-center gap-2">
          <StatusIndicator status={status} />
          <span className="text-sm text-text-secondary capitalize">
            {status}
          </span>
        </div>
      </div>

      {/* Línea separadora */}
      <div className="w-full h-px bg-border-soft opacity-40 my-1"></div>

      {/* Botón de ver/ocultar detalles */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="
          text-sm
          text-accent-cyan
          hover:underline
          self-end
        "
      >
        {showDetails ? "Ocultar detalles" : "Ver detalles"}
      </button>

      {/* Descripción (solo si showDetails === true) */}
      {showDetails && (
        <p className="text-sm text-text-secondary leading-snug mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
