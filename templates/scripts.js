// 1. Constants and Configuration
const apiKey = '3390aad6b4f0ac6bc53abc872ec9f240';
const baseUrl = 'https://api.themoviedb.org/3';
const horrorMoviesUrl = `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=27`;
const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&query=`;

// 2. Utility Functions
function clearMovies() {
  const movieContainer = document.getElementById('movieContainer');
  movieContainer.innerHTML = ''; // Clear all displayed movies
}

// 3. Core Functions

// Fetch preloaded horror movies
async function fetchHorrorMovies() {
  try {
    const response = await fetch(horrorMoviesUrl);
    const data = await response.json();

    // Fetch IMDb ID for each movie
    const moviesWithImdb = await Promise.all(
      data.results.map(async (movie) => {
        const movieDetailsResponse = await fetch(`${baseUrl}/movie/${movie.id}?api_key=${apiKey}`);
        const movieDetails = await movieDetailsResponse.json();
        return { ...movie, imdb_id: movieDetails.imdb_id }; // Add IMDb ID
      })
    );

    displayMovies(moviesWithImdb);
  } catch (error) {
    console.error('Error fetching horror movies:', error);
  }
}

// Search movies dynamically based on query
async function searchMovies(query) {
  try {
    const response = await fetch(`${searchUrl}${query}&api_key=${apiKey}`);
    const data = await response.json();



    // Filter results for horror genre (genre_id: 27)
    const horrorMovies = data.results.filter(movie => movie.genre_ids.includes(27));
    // Fetch IMDb ID for each movie
    const moviesWithImdb = await Promise.all(
      horrorMovies.map(async (movie) => {
        const movieDetailsResponse = await fetch(`${baseUrl}/movie/${movie.id}?api_key=${apiKey}`);
        const movieDetails = await movieDetailsResponse.json();
        return { ...movie, imdb_id: movieDetails.imdb_id }; // Add IMDb ID
      })
    );

    displayMovies(moviesWithImdb);
  } catch (error) {
    console.error('Error searching movies:', error);
  }
}

// Display movies on the page
function displayMovies(movies) {
  const movieContainer = document.getElementById('movieContainer');
  const limitedMovies = movies.slice(0, 3);
  movieContainer.innerHTML = limitedMovies.map(movie => `
    <div class="movie">
      <a class="imdb-movie-link" href="https://www.imdb.com/title/${movie.imdb_id}/" target="_blank" rel="noopener noreferrer">
        <img class="searched-movie" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" loading="lazy">
        <h3 class="search-title">${movie.title}</h3>
        
      </a>
    </div>
  `).join('');

  if (movies.length === 0) {
    movieContainer.innerHTML = `<p style="background-color:rgb(26, 25, 25); color:#fff; display:inline-block; font-family: Roboto, sans-serif; padding:10px; border-radius:15px; box-shadow: 0 4px 8px rgba(255, 0, 0, 0.2);"> No movies found.</p>`;
  }
}

// 4. Event Listeners and Logic
document.getElementById('searchBar').addEventListener('input', async (e) => {
  const query = e.target.value;
  if (query.length > 1) {
    await searchMovies(query); // Trigger search if query length > 2
  } else {
    clearMovies(); // Clear results if query is too short
  }
});