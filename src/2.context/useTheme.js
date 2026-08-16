import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

// Hook personalizado para acceder al contexto
export function useTheme() {
    return useContext(ThemeContext);
}