export default function RecommendationsBox() {

    // Recomendaciones del sistema.
    const recommendations = [
        {
            title: "Update Security Definitions",
            description: "New threat signatures are available. Updating improves detection accuracy.",
            icon: "⬆️",
        },
        {
            title: "Review Suspicious Files",
            description: "Some files require manual verification to ensure they are safe.",
            icon: "🔍",
        },
        {
            title: "Enable Real-Time Protection",
            description: "Activating real-time scanning reduces exposure to active threats.",
            icon: "⚡",
        },
        {
            title: "Optimize Scan Settings",
            description: "Adjust scan frequency and depth for better performance.",
            icon: "⚙️",
        },
    ];

    return (
        // Contenedor general con separación vertical
        <section className="flex flex-col gap-4 mt-6">

            {/* Título del bloque */}
            <h2 className="text-xl font-semibold text-[--text-main]">
                Recommendations
            </h2>

            {/* Lista de recomendaciones */}
            <div className="flex flex-col gap-3">
                {recommendations.map((item, index) => (
                    <div
                        key={index}

                        // Tarjeta con fondo, borde y hover usando tus variables CSS.
                        className="
                            bg-[--bg-card]
                            border border-[--border-soft]
                            rounded-lg
                            p-4
                            flex items-start gap-3

                            /* Hover suave y profesional */
                            transition-all duration-200
                            hover:bg-[--bg-hover-strong]
                            hover:border-[--accent-cyan]
                            hover:shadow-md
                        "
                    >
                        {/* Icono grande */}
                        <span className="text-2xl">
                            {item.icon}
                        </span>

                        {/* Texto principal */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[--text-main] font-medium">
                                {item.title}
                            </span>

                            <span className="text-sm text-[--text-secondary] leading-snug">
                                {item.description}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
