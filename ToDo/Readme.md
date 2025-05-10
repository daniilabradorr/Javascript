FastTask-App

To-Do List Rápida y Ligera creada con HTML, CSS y JavaScript puro, gestionada con Yarn.

🚀 Descripción

FastTask-App es una aplicación de lista de tareas con:

CRUD de tareas (crear, leer, actualizar, eliminar) usando localStorage.

Filtros: todas, pendientes, completadas.

Animaciones al agregar, completar y eliminar tareas.

Swipe-to-delete en dispositivos táctiles.

Footer fijo con logo y enlaces a GitHub / LinkedIn.

Favicon SVG personalizado.

🔧 Requisitos

Node.js y Yarn instalados.

Navegador moderno (soporta ES6 y localStorage).

📥 Instalación

# Clona el repositorio
git clone https://github.com/daniilabradorr/fast-task-app.git
cd fast-task-app

# Instala dependencias (solo para scripts Yarn, no hay build obligatorio)
yarn install

🏃‍♂️ Ejecución en desarrollo

yarn start # o bien abre index.html en tu navegador

📦 Build y despliegue

No hay paso de compilación: el proyecto es estático. Para desplegar en GitHub Pages:

Sube todo el contenido (excluyendo node_modules/) a la rama main.

En la sección Settings > Pages, elige main y carpeta / (root).

Guarda y accede a: https://<tu-usuario>.github.io/fast-task-app/.

Nota: Cada visitante usa su propio localStorage. No comparte datos entre usuarios.

📁 Estructura de carpetas

fast-task-app/
├── src/
│   ├── style.css      # Estilos compilados
│   ├── main.js        # Lógica de tareas y localStorage
│   └── img/           # Imágenes (logo, íconos SVG)
├── index.html         # Punto de entrada
├── package.json
├── yarn.lock
└── .gitignore

🤝 Contribuir

Haz un fork del repositorio.

Crea una rama con tu feature: git checkout -b feature/nombre

Sube tus cambios: git push origin feature/nombre

Abre un pull request.

📄 Licencia

Este proyecto está bajo la licencia MIT.

