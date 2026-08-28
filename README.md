# ShieldScan Inspector

ShieldScan Inspector es una aplicación web desarrollada con **React + Vite** que permite analizar cabeceras HTTP y generar un informe claro sobre el nivel de seguridad de una configuración web. Está orientada a entornos donde se requiere validar rápidamente si un servidor cumple buenas prácticas de seguridad.


## 🚀 Instalación

> Los comandos de instalación funcionan en cualquier terminal con Git y Node.js:
> PowerShell, Bash, CMD, Windows Terminal, Git Bash o WSL.

PUEDES INSTALAR EL PROYECTO DE DOS FORMAS:

### ✔ Opción A — Descargar el ZIP desde GitHub
1. Descargar el ZIP del repositorio.
2. Extraer el contenido.
3. Instalar dependencias:
        
    npm install

4. Ejecutar en modo desarrollo:

    npm run dev

5. Acceder a la app:

    http://localhost:5173

### ✔ Opción B — Clonar el repositorio (opcional)
Si prefieres obtener el proyecto mediante Git en lugar de descargar el ZIP:

1. Clonar:

    git clone https://github.com/OmarGP/shieldscan-inspector-v2.git

Una vez clonado:

2. Accede a la carpeta del proyecto:

    cd shieldscan-inspector-v2

3. Instala las dependencias:

    npm install

4. Ejecuta la aplicación:

    npm run dev

5. Acceder a la app:

    http://localhost:5173


## ¿Qué hace la aplicación?

ShieldScan Inspector permite analizar cabeceras HTTP de dos formas:

    ► Pegando directamente un bloque de cabeceras HTTP en el panel de entrada.

    ► Introduciendo una URL y pulsando el botón Analizar, para obtener las cabeceras automáticamente.

La aplicación:

    ► Identifica cabeceras:

        ○ Correctamente configuradas

        ○ Ausentes

        ○ Mal configuradas

► Genera un informe visual con el estado de cada cabecera.

► Muestra recomendaciones de mejora basadas en buenas prácticas OWASP.

► Incluye ejemplos precargados (seguro y vulnerable) para comparar configuraciones.


## 📘 Cómo usarla

1. Copia las cabeceras HTTP desde tu navegador, servidor o herramienta de análisis;
   o introduce la URL de la página web que deseas evaluar.

2. Pega las cabeceras en el panel de entrada o escribe la URL en la barra de búsqueda.

3. Si introduces una URL, pulsa Analizar.
   Si pegas cabeceras, el análisis se ejecutará automáticamente.

4. Revisa:

    ► El estado individual de cada cabecera

    ► Las recomendaciones de mejora

    ► La puntuación global de seguridad

Además, puedes utilizar los ejemplos precargados (seguro y vulnerable) para comparar configuraciones.