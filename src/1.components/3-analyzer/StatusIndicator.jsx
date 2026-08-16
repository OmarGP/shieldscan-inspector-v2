// Indicador visual de estado (rombo).
// Se usa dentro de SecurityCard.jsx y otros módulos.
// Cambia de color según el nivel de riesgo.

export default function StatusIndicator({ status }) {
    /*
        status puede ser:
        - "success"  → verde
        - "warning"  → amarillo
        - "danger"   → rojo

        Aquí definimos los colores del rombo.
        Usamos clases Tailwind porque son colores semánticos.
    */
    const statusColors = {
        success: "bg-green-500",
        warning: "bg-yellow-500",
        danger: "bg-red-500",
    };

    return (
        <div
            className={`
                w-4 h-4
                rotate-45
                ${statusColors[status]}
            `}
        />
    );
}
