## Buscador de Películas (OMDb API)
Podeís ver su uso en el webm

Este proyecto es un pequeño buscador de películas que interactúa con la API de OMDb ([https://www.omdbapi.com/](https://www.omdbapi.com/)). Su objetivo principal es **practicar JavaScript**, trabajar la lógica de peticiones asíncronas, manipulación del DOM y gestión de eventos, dejando el estilo al mínimo para centrar la atención en el código.

### Características principales

* **Búsqueda de películas** por título y filtro opcional por año.
* **Manejo de estados**: indicador de carga (spinner) y mensajes de error.
* **Renderizado dinámico** de tarjetas de película con imagen, título, año y botón de detalles.
* **Modal de detalles**: muestra información completa (género, actores, sinopsis, clasificación) en un ventanal central.
* **Validaciones** básicas: evita búsquedas vacías y controla errores de red y respuesta de la API.

### Estructura del proyecto

* `index.html`: contiene la estructura básica de HTML, el formulario de búsqueda, el contenedor de resultados y el modal.
* `style.css`: estilos mínimos para la distribución y el modal.
* `main.js`: lógica completa del proyecto:

  1. Captura de elementos del DOM.
  2. Escucha de evento `submit` del formulario.
  3. Validación de inputs.
  4. Construcción dinámica de la URL usando `URL` y `searchParams`.
  5. Petición `fetch` asíncrona a la API.
  6. Manejo de estados (spinner + errores).
  7. Renderizado de resultados con `createElement` y `innerHTML`.
  8. Apertura y cierre de un modal para mostrar detalles de la película.

### Cómo usar

1. Clona o descarga este repositorio.
2. Obtén tu clave gratuita en OMDb: [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
3. En `main.js`, reemplaza `const apiKey = 'TU_API_KEY'` por tu clave obtenida.
4. Abre `index.html` en tu navegador.
5. Escribe un nombre de película (y opcionalmente un año) y pulsa "Buscar".
6. Haz clic en "Ver detalles" para abrir el modal con información completa.

### Por qué este enfoque

* **Enfoque en la lógica**: el estilo es intencionalmente simple para priorizar la práctica de JavaScript.
* **APIs y promesas**: uso de `async/await` y `fetch` para trabajar con peticiones asíncronas.
* **Manipulación del DOM**: creación y actualización dinámica de elementos.
* **Buenas prácticas**: validación de inputs, manejo de errores, limpieza de estados anteriores.

¡Gracias por explorar este proyecto! Cualquier sugerencia o mejora es bienvenida para seguir practicando y aprendiendo.
