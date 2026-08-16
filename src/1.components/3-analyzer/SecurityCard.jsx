// Tarjeta individual de seguridad.
// Representa una cabecera analizada (HSTS, CSP, XFO, etc.).
// Usa props para ser reutilizable y flexible.

export default function SecurityCard({ title, status, description, onClick }) {
    /*
        status puede ser:
        - "success"  → verde
        - "warning"  → amarillo
        - "danger"   → rojo

        Aquí definimos los colores del rombo según el estado.
        Usamos variables CSS para integrarlo con el tema claro/oscuro.
    */
    const statusColors = {
        success: "bg-green-500",
        warning: "bg-yellow-500",
        danger: "bg-red-500",
    };

    return (
        <div
            className="
                bg-[--bg-card]
                border border-[--border-soft]
                rounded-lg
                p-4
                flex flex-col
                gap-3
                transition-all duration-200
                hover:bg-[--bg-hover-strong]
                hover:border-[--accent-cyan]
                hover:shadow-md
            "
        >
            {/* Título de la cabecera */}
            <h3 className="text-lg font-semibold text-[--text-main]">
                {title}
            </h3>

            {/* Indicador de estado (rombo) */}
            <div className="flex items-center gap-2">
                <div
                    className={`
                        w-4 h-4 rotate-45
                        ${statusColors[status]}
                    `}
                />
                <span className="text-sm text-[--text-secondary] capitalize">
                    {status}
                </span>
            </div>

            {/* Descripción de la cabecera */}
            <p className="text-sm text-[--text-secondary] leading-snug">
                {description}
            </p>

            {/* Botón de ver detalles */}
            <button
                onClick={onClick}
                className="
                    mt-2
                    text-sm
                    text-[--accent-cyan]
                    hover:underline
                "
            >
                View details
            </button>
        </div>
    );
}
