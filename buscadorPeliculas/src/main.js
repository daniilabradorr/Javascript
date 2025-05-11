// main.js

// 1. Referencias al DOM
const searchForm   = document.getElementById('searchForm');
const movieSearch  = document.getElementById('movieSearch');
const yearFilter   = document.getElementById('yearFilter');
const movieResults = document.getElementById('movieResults');
const loading      = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

// 1.b Referencias al modal
const movieModal = document.getElementById('movieModal');
const modalBody  = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// 2. Tu API key de OMDb
const apiKey = 'e934e9d';

// 3. Escucha el evento submit del formulario
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();              // Evita recarga de página
  const term = movieSearch.value.trim();
  const year = yearFilter.value.trim();

  // 4. Validación básica
  if (!term) {
    alert('Por favor, ingresa un nombre de película.');
    return;
  }

  // 5. Mostrar spinner y ocultar mensajes anteriores
  loading.style.display      = 'block';
  errorMessage.style.display = 'none';
  movieResults.innerHTML     = '';

  // 6. Construir URL de la petición
  const url = new URL('https://www.omdbapi.com/');
  url.searchParams.set('apikey', apiKey);
  url.searchParams.set('s', term);
  if (year) url.searchParams.set('y', year);

  // 7. Petición FETCH
  try {
    const resp = await fetch(url);
    const data = await resp.json();

    // 8. Ocultar spinner
    loading.style.display = 'none';

    // 9. Procesar respuesta
    if (data.Response === 'True') {
      renderMovies(data.Search);
    } else {
      errorMessage.textContent = 'No se encontraron películas con esos parámetros.';
      errorMessage.style.display = 'block';
    }
  } catch (err) {
    // 10. Manejo de errores de red
    loading.style.display      = 'none';
    errorMessage.textContent   = 'Error al obtener datos. Intenta de nuevo más tarde.';
    errorMessage.style.display = 'block';
    console.error('Fetch error:', err);
  }
});

// 11. Función para renderizar tarjetas de película
function renderMovies(movies) {
  movieResults.innerHTML = '';  // Limpiar resultados anteriores

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    card.innerHTML = `
      <img
        src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'}"
        alt="Poster de ${movie.Title}"
      >
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button class="details-button" data-id="${movie.imdbID}">
        Ver detalles
      </button>
    `;
    movieResults.appendChild(card);
  });

  // Adjuntar evento a todos los botones de detalles
  document
    .querySelectorAll('.details-button')
    .forEach(btn => btn.addEventListener('click', () => {
      showMovieDetails(btn.dataset.id);
    }));
}

// 12. Función para mostrar detalles de una película en modal
async function showMovieDetails(imdbID) {
  // Mostrar spinner mientras carga detalles
  loading.style.display      = 'block';
  errorMessage.style.display = 'none';

  const url = new URL('https://www.omdbapi.com/');
  url.searchParams.set('apikey', apiKey);
  url.searchParams.set('i', imdbID);
  url.searchParams.set('plot', 'full');

  try {
    const resp    = await fetch(url);
    const details = await resp.json();
    loading.style.display = 'none';

    if (details.Response === 'True') {
      // Rellenar el contenido del modal
      modalBody.innerHTML = `
        <h2>${details.Title} (${details.Year})</h2>
        <p><strong>Género:</strong> ${details.Genre}</p>
        <p><strong>Actores:</strong> ${details.Actors}</p>
        <p><strong>Clasificación:</strong> ${details.Rated}</p>
        <img
          src="${details.Poster !== 'N/A' ? details.Poster : 'https://via.placeholder.com/300'}"
          alt="Poster de ${details.Title}"
          style="width:100%; margin-top:10px; border-radius:4px;"
        >
        <p style="margin-top:15px;"><strong>Sinopsis:</strong> ${details.Plot}</p>
      `;
      movieModal.style.display = 'flex';  // Mostrar modal en modo flex para centrar
    } else {
      errorMessage.textContent   = 'No se pudieron obtener los detalles de la película.';
      errorMessage.style.display = 'block';
    }
  } catch (err) {
    loading.style.display      = 'none';
    errorMessage.textContent   = 'Error al cargar detalles. Intenta de nuevo más tarde.';
    errorMessage.style.display = 'block';
    console.error('Details fetch error:', err);
  }
}

// 13. Listeners para cerrar el modal
modalClose.addEventListener('click', () => {
  movieModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === movieModal) {
    movieModal.style.display = 'none';
  }
});
