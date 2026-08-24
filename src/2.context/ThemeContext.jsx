// Contexto global para gestionar el modo claro/oscuro.
// Permite usar useTheme() en cualquier componente.
// Sincroniza el tema con variables CSS y lo guarda en localStorage.

import { createContext, useEffect, useState } from "react";

// Crear el contexto
const ThemeContext = createContext();

// Provider que envuelve toda la aplicación
export function ThemeProvider({ children }) {
    // Estado global del tema
    const [theme, setTheme] = useState(() => {
        // Recuperar el tema guardado
        return localStorage.getItem("theme") || "light";
    });

    // Alternar entre claro y oscuro
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    // Aplicar el tema al <html> y guardar en localStorage
    useEffect(() => {
        const root = document.documentElement;

        // Añadir o quitar la clase "dark"
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        // Guardar preferencia
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}