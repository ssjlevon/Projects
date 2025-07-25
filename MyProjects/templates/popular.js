// API Setup
import { apiKey } from './config.js';
const horrorUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc`;
const baseUrl = 'https://api.themoviedb.org/3';

async function fetchPopularHorrorMovies() {
  try {
    const res = await fetch(horrorUrl);
    const data = await res.json();
    
    const topFive = data.results.slice(0, 7);
    console.log(topFive);

    const moviesWithImdb = await Promise.all(
      topFive.map(async movie => {
        const movieDetailsRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
        const movieDetails = await movieDetailsRes.json();
        return { ...movie, imdb_id: movieDetails.imdb_id };
      })
    );

    displayPopular(moviesWithImdb); // Display content first
  } catch (error) {
    console.error('Error fetching popular horror movies:', error);
  }
}

function displayPopular(movies) {
  const horrorContainer = document.getElementById('horrorContainer');
  horrorContainer.innerHTML = movies.map(movie => `
    <div class="trend-movie">
      <a class="imdb-link" href="https://www.imdb.com/title/${movie.imdb_id}/" target="_blank" rel="noopener noreferrer">
        <img class="pop-movie" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" loading="lazy">
        <p class="search-title">${movie.title}</p>
      </a>
    </div>`).join('');
  
  setupPopularScroll(); // Now, set up scroll after content is added
}

// Scroll Logic for Popular Movies
function setupPopularScroll() {
  let popularContainers = document.querySelectorAll('.popular-container');
  
  popularContainers.forEach(container => {
    let scrollWrapper = container.querySelector('.popular-wrapper');
    let leftArrow = container.querySelector('.pop-left');
    let rightArrow = container.querySelector('.pop-right');
  
    function scrollLeft() {
      scrollWrapper.scrollBy({ left: -200, behavior: 'smooth' });
    }
  
    function scrollRight() {
      scrollWrapper.scrollBy({ left: 200, behavior: 'smooth' });
    }
  
    leftArrow.addEventListener('click', scrollLeft);
    rightArrow.addEventListener('click', scrollRight);
  });
}

// Call to fetch and display popular movies on load
document.addEventListener('DOMContentLoaded', function () {
  fetchPopularHorrorMovies();
});

