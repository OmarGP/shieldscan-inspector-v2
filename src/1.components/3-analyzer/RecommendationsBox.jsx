/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import StatusIndicator from "./StatusIndicator";

export default function RecommendationsBox({ items = [], totalHeaders = 0 }) {
  const hasAnalysis = totalHeaders > 0;
  const hasRecs = Array.isArray(items) && items.length > 0;

  if (!hasAnalysis) return null;

  const [expanded, setExpanded] = useState(false);
  const [columns, setColumns] = useState(1);

  // Detectar columnas según tamaño de pantalla
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1280) setColumns(3); // xl
      else if (window.innerWidth >= 768) setColumns(2); // md
      else setColumns(1); // móvil
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Mostrar tarjetas según expanded o columnas
  const visibleItems = expanded ? items : items.slice(0, columns);

  return (
    <section className="flex flex-col gap-4 mt-6">
      <h2 className="text-xl font-semibold text-text-main">Recomendaciones</h2>

      {!hasRecs && (
        <p className="text-text-secondary text-sm">
          No hay recomendaciones. Todas las cabeceras están correctamente configuradas.
        </p>
      )}

      {hasRecs && (
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleItems.map((item, index) => (
              <div
                key={index}
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
                {/* Cabecera + indicador */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-text-main">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <StatusIndicator status={item.status} />
                    <span className="text-sm text-text-secondary capitalize">
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Línea separadora */}
                <div className="w-full h-px bg-border-soft opacity-40 my-1"></div>

                {/* Descripción */}
                <p className="text-sm text-text-secondary leading-snug">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Fade-bottom */}
          {!expanded && items.length > columns && (
            <div
              className="
                absolute bottom-0 left-0 w-full h-20
                fade-bottom pointer-events-none z-0
              "
            ></div>
          )}

          {/* Botón Ver más / Ver menos */}
          {items.length > columns && (
            <div className="flex justify-end">
              <button
                onClick={() => setExpanded(!expanded)}
                className="
                  relative z-20
                  mt-4 px-4 py-2 
                  bg-bg-card 
                  border border-border-soft 
                  rounded-lg 
                  text-text-main 
                  hover:bg-bg-hover-strong
                  hover:text-accent-cyan
                  hover:border-accent-cyan
                  transition-all duration-200
                "
              >
                {expanded ? "↑ Ver menos" : "↓ Ver más"}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
