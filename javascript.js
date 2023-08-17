document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = "d9cf23cf23f14a29b69eccb99afeaeff";
  const baseUrl = "https://api.themoviedb.org/3/movie/popular";
  const language = "en-US";
  const latestPage = 1;
  const trendingPage = 2; 
  const latestContainer = document.getElementById("latest-container");
  const trendingContainer = document.getElementById("trending-container");

  async function fetchMovies(page) {
    try {
      const response = await fetch(
        `${baseUrl}?api_key=${apiKey}&language=${language}&page=${page}`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
    img.alt = movie.title;
    movieCard.appendChild(img);

    const title = document.createElement("h3");
    title.textContent = movie.title;
    movieCard.appendChild(title);

    const description = document.createElement("p");
    description.textContent = movie.overview; 
    movieCard.appendChild(description);

    return movieCard;
  }

  async function populateMovies(container, page) {
    const movies = await fetchMovies(page);

    movies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      container.appendChild(movieCard);
    });
  }

  populateMovies(latestContainer, latestPage);
  populateMovies(trendingContainer, trendingPage);
});
