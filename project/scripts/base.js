// Const
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2VkNjIyZjVkOWVjOTUxOTY4ZTUxNGM1MDhhYWI0ZSIsInN1YiI6IjY2NTgxMWUxNTNlYmQ1ZDY4NjkzZGQzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y0mzbBSS_FajpfYyFqtmjniY3KtuOsFmddh43SD5G4Y";
const MOVIE_ID = new URLSearchParams(window.location.search).get("id");
const MOVIES_LIKE = "movies_like";
const MOVIES_NO_LIKE = "movies_no_like";
const MY_LIST = "my_movie_list";
const PAGE_POPULAR = "page_popular";
const MOVIE_COMMENTS = "movie_comments";
const BEFORE_PAGE = "before_page";
const MOVIE_SEARCH = "movie_search";

// Footer: Set Date
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

currentYear.innerHTML = today.getFullYear();
lastModified.innerHTML = document.lastModified;

// Button Menu
const buttonMenu = document.querySelector("#menu");
const navbar = document.querySelector(".navigation");

buttonMenu.addEventListener("click", () => {
  navbar.classList.toggle("open");
  buttonMenu.classList.toggle("open");
});

// Fetch data
async function fetchFromTMDB(type, value = undefined, page = 1) {
  let url = "";
  switch (type) {
    case "trending":
      url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
      break;
    case "popular":
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
      break;
    case "top_rated":
      url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
      break;
    case "upcoming":
      url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
      break;
    case "recommendations":
      if (value) {
        url = `https://api.themoviedb.org/3/movie/${value}/recommendations?language=en-US&page=${page}`;
      }
      break;
    case "details":
      if (value) {
        url = `https://api.themoviedb.org/3/movie/${value}?language=en-US&append_to_response=videos,images`;
      }
      break;
    case "credits":
      if (value) {
        url = `https://api.themoviedb.org/3/movie/${value}/credits?language=en-US`;
      }
      break;
    case "query":
      if (value) {
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          value
        )}&language=en-US&include_adult=false&append_to_response=videos,images`;
      }
      break;
    default:
      break;
  }

  if (!url) {
    console.error("Error: url required");
    return;
  }
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + TOKEN,
    },
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
}

// Genres
const getGenres = async (genre_ids) => {
  if (genre_ids && genre_ids.length) {
    const res = await fetch("data/movie-genres.json");
    const data = await res.json();

    // return data.genres;
    return data.genres.filter((genre) => genre_ids.includes(genre.id));
  }
  return [];
};

// Toggle Button: Show and Hidde Button
function toggleButton(activate, deactivate) {
  const activateBtn = document.querySelector(activate);
  activateBtn.classList.remove("hidden");
  activateBtn.style.zIndex = 2;

  const deactivateBtn = document.querySelector(deactivate);
  deactivateBtn.style.zIndex = -1;
  deactivateBtn.classList.add("hidden");
}

// Local Storage
function isInLocalStorage(item, value) {
  const data = JSON.parse(localStorage.getItem(item));
  if (data && data.length > 0) {
    const movieIndex = data.find((m) => m == value);
    if (movieIndex >= 0) return true;
  }
  return false;
}

function addToLocalStorage(item, value) {
  const data = JSON.parse(localStorage.getItem(item));
  if (data && data.length > 0) {
    const movieFind = data.find((m) => m == value);
    if (!movieFind) {
      data.push(value);
      localStorage.setItem(item, JSON.stringify(data));
    }
  } else {
    localStorage.setItem(item, JSON.stringify([value]));
  }
}

function deleteFromLocalStorage(item, value) {
  const data = JSON.parse(localStorage.getItem(item));
  if (data && data.length > 0) {
    const dataFiltered = data.filter((m) => m != value);
    localStorage.setItem(item, JSON.stringify(dataFiltered));
  }
}

// Movies HTML
async function createMoviesHTML(data = []) {
  const sectionMovies = await Promise.all(
    data.map(async (movie) => {
      if (movie && movie.id) {
        const genres = await getGenres(movie.genre_ids);

        let genresHTML = genres.map((g) => g.name).join(", ") || "";

        const releaseDate = new Date(movie.release_date);
        const year = releaseDate.getFullYear() || "";

        const imageURL = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://placehold.co/500/webp";

        return `<section class="card" data-id="${movie.id}">
        <div class="card-normal">
          <img src="${imageURL}" alt="${
          movie.title
        }" loading="lazy" width="500" height="auto">
        </div>
        <a class="card-hover" href="./detail.html?id=${movie.id}">
          <h3>${movie.title}</h3>
          <p>${year}</p>
          <p>${movie.overview?.slice(0, 100)}...</p>
          <div class="card-info">
            <p><span>Rating: </span>${movie.vote_average}/10</p>
            <br>
            <p><span>Votes: </span>${movie.vote_count}</p>
            <br>
            <p><span>Genres: </span>${genresHTML}</p>
          </div>
        </a>
      </section>`;
      }
    })
  );

  return sectionMovies;
}

// Movie Section
const createMovieSection = async (data = []) => {
  if (data.length > 0) {
    const moviesHTML = await createMoviesHTML(data);
    document.querySelector(".container").innerHTML = moviesHTML.join("");
  } else {
    document.querySelector(".container").innerHTML = "There is no data.";
  }
};

// Pagination
function createPagination(page, total_pages, min = 1, max = 500) {
  const previousPage = page > 1 ? page - 1 : 1;
  const maxPage = total_pages > max ? max : total_pages;
  const nextPage = page < maxPage ? page + 1 : maxPage;

  return `<div class="pagination">
    <button class="btn btn-pagination" data-page="${min}" aria-label="Go to the first age">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/>
      </svg>
    </button>
    <button class="btn btn-pagination" data-page="${previousPage}" aria-label="Go to the previous page">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="30" height="30">
        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
      </svg>
    </button>
    <button class="btn btn-pagination" data-page="${nextPage}" aria-label="Go to the next page">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="30" height="30">
        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
      </svg>
    </button>
    <button class="btn btn-pagination" data-page="${maxPage}" aria-label="Go to the last page">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
        <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
      </svg>
    </button>
  </div>`;
}

// Date utils
const formatDateTime = (v) => (v > 9 ? v : "0" + v);
const dateToTimestamp = (date) => Math.floor(date.getTime() / 1000);
const timestampToDate = (timestamp) => new Date(timestamp * 1000);

// Date unix to Local Date
function convertTimestampToDateTime(unix_timestamp) {
  if (!unix_timestamp) return "";

  let date = new Date(unix_timestamp * 1000);
  let now = new Date();

  // date
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dateMonth = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  //now
  let currentMonth = now.getMonth() + 1;
  let currentYear = now.getFullYear();
  let currentDateMonth = now.getDate();
  let currentHours = now.getHours();
  let currentMinutes = now.getMinutes();
  let currentSeconds = now.getSeconds();

  let years = currentYear - year;
  let months =
    currentMonth - month >= 0
      ? currentMonth - month
      : 12 - currentMonth - month;

  years = years == 1 && months == 0 && currentDateMonth < dateMonth ? 0 : years;

  months = months >= 1 && currentDateMonth < dateMonth ? months - 1 : months;

  if (years)
    return years > 1
      ? `${years}-${formatDateTime(dateMonth)}-${formatDateTime(
          month
        )} ${formatDateTime(hours)}:${formatDateTime(minutes)}`
      : "1 year ago";

  if (months)
    return months > 1 ? `${months} months ago` : `${months} month ago`;

  if (currentDateMonth - dateMonth) {
    const diffTime = Math.abs(date - now);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 1 ? `${diffDays} days ago` : `${diffDays} day ago`;
  }

  let diffHours = Math.abs(currentHours - hours);
  if (diffHours)
    return diffHours > 1 ? `${diffHours} hours ago` : `${diffHours} hour ago`;

  let diffMinutes = Math.abs(currentMinutes - minutes);
  if (diffMinutes)
    return diffMinutes > 1
      ? `${diffMinutes} minutes ago`
      : `${diffMinutes} minute ago`;

  let diffSeconds = Math.abs(currentSeconds - seconds);
  return diffSeconds > 1 ? "a few seconds ago" : "just now";
}

// Search
document.querySelector(".search").addEventListener("keyup", async function (e) {
  e.preventDefault();
  if (e.keyCode === 13 && e.target.value.length > 0) {
    window.location.href = `search.html?search=${encodeURIComponent(
      e.target.value
    )}`;
  }
});

// Navigation
document.querySelectorAll(".navigation-link").forEach((node) => {
  node.addEventListener("click", function (e) {
    localStorage.setItem(MOVIE_SEARCH, "");
  });
});
