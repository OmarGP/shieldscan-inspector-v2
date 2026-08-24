// Grid que contiene todas las tarjetas de seguridad.
// Recibe un array de resultados y renderiza SecurityCard.jsx para cada uno.

import SecurityCard from "./SecurityCard";

export default function SecurityCardGrid({ items }) {
    /*
        items debe ser un array de objetos con:
        {
            title: "HSTS",
            status: "success",
            description: "Strict-Transport-Security is correctly configured.",
        }

        Este array vendrá del análisis real del SPA.
    */

    return (
        <section
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-4
                mt-6
            "
        >
            {items.map((item, index) => (
                <SecurityCard
                    key={index}
                    title={item.title}
                    status={item.status}
                    description={item.description}
                    onClick={() => console.log("View details:", item.title)}
                />
            ))}
        </section>
    );
}
