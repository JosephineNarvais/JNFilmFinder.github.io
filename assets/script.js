const tmdbKey = '872ecefa4bcab7ce152e1a3e4b76641b';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');


// Fetches 'genres' from the TBDB API
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok){
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      console.log(genres);
      return genres;
    }
  }
  catch(error){
    console.log(error);
  }
};

// Fetches 'movies' from TMDB API
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;

const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

try {
    const response = await fetch(urlToFetch);
    if (response.ok){
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  }
  catch(error){
    console.log(error);
  }
};

//Fetches 'movie info' from TMDB API
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

try {
    const response = await fetch(urlToFetch);
    if (response.ok){
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse
      return movieInfo;
    }
  }
  catch(error){
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
const movies = await getMovies();
const randomMovie = getRandomMovie(movies);
const info = await getMovieInfo(randomMovie);
displayMovie(info);

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;