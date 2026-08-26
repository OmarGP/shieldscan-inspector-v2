// Importamos useState y useEffect desde React.
// useState: para guardar si el modo oscuro está activado.
// useEffect: para aplicar la clase "dark" al <html> cuando cambie el estado.
import { useEffect, useState } from "react";

export default function ThemeToggle() {

    // Estado que controla si el modo oscuro está activo.
    // false = modo claro
    // true = modo oscuro (por defecto)
    const [darkMode, setDarkMode] = useState(true);

    // Este efecto se ejecuta cada vez que darkMode cambia.
    useEffect(() => {
        // Obtenemos el elemento <html> del documento.
        const html = document.documentElement;

        // Si darkMode es true, activamos el modo oscuro añadiendo la clase "dark".
        if (darkMode) {
            html.classList.add("dark");
        } 
        // Si darkMode es false, quitamos la clase "dark" y volvemos al modo claro.
        else {
            html.classList.remove("dark");
        }

        // El efecto depende de darkMode, así que se ejecuta cada vez que cambia.
    }, [darkMode]);

    return (
        <button
            // Al hacer clic, invertimos el estado: si estaba en claro pasa a oscuro y viceversa.
            onClick={() => setDarkMode(!darkMode)}

            // Clases Tailwind + variables CSS para estilos dinámicos.
            className="
                flex items-center gap-2
                px-3 py-2
                rounded-md
                bg-bg-card
                text-text-main
                border border-border-soft

                hover:bg-bg-hover-strong
                hover:text-accent-cyan
                hover:border-accent-cyan

                transition-all duration-200
                cursor-pointer
            "
        >
            {/* Ícono dinámico: sol para modo claro, luna para modo oscuro */}
            <span className="text-lg">
                {darkMode ? "☀️" : "🌙"}
            </span>

            {/* Texto dinámico según el modo */}
            <span className="text-sm">
                {darkMode ? "Modo Claro" : "Modo Oscuro"}
            </span>
        </button>
    );
}
