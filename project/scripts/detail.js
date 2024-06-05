// Detail
async function getMovieDetails() {
  const dataDetails = await fetchFromTMDB("details", MOVIE_ID);
  renderDetails(dataDetails);
}

async function renderDetails(data) {
  if (!data) {
    document.querySelector(".container").innerHTML = "<p>Movie NOT Found</p>";
    return;
  }
  document.querySelector("#movie-name").textContent = data.title;

  const imageURL = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "https://placehold.co/500/webp";

  const posterImg = document.createElement("img");
  posterImg.src = imageURL;
  posterImg.alt = data.title;
  posterImg.id = "image-poster";
  posterImg.width="275";
  posterImg.height="413";
  document.querySelector(".details-image-buttons").prepend(posterImg);

  renderButtons();

  const dataCredits = await fetchFromTMDB("credits", MOVIE_ID);
  const { casting, director } = extractCreditInfo(dataCredits);

  const genres = await getGenres(data.genres.map((i) => i.id));

  let genresHTML = "";
  genres.forEach(
    (g) =>
      (genresHTML += `<span class="genre-tag" style="background-color:${g.color};">${g.name}</span>`)
  );

  let html = `
  <p>${data.overview}</p>
  <table>
    <tbody>
      <tr>
        <th>Original Title:</th>
        <td>${data.original_title}</td>
      </tr>
      <tr>
        <th>Tagline:</th>
        <td>${data.tagline}</td>
      </tr>
      <tr>
        <th>Release Date:</th>
        <td>${data.release_date}</td>
      </tr>
      <tr>
        <th>Language:</th>
        <td>${data.original_language?.toUpperCase()}</td>
      </tr>
      <tr>
        <th>Director:</th>
        <td>${director}</td>
      </tr>
      <tr>
        <th>Cast:</th>
        <td>${casting}</td>
      </tr>
      <tr>
        <th>Votes:</th>
        <td>${data.vote_count}</td>
      </tr>
      <tr>
        <th>Votes Average:</th>
        <td>${data.vote_average} / 10</td>
      </tr>
      <tr>
        <th>Popularity:</th>
        <td>${data.popularity}</td>
      </tr>
      <tr>
        <th>Genders:</th>
        <td id="tdGenders">${genresHTML}</td>
      </tr>
    </tbody>
  </table>
  `;

  document.querySelector(".info").innerHTML = html;

  const videoTrailer = data.videos?.results?.find(
    (i) => i.site == "YouTube" && i.type == "Trailer"
  );

  if (videoTrailer && videoTrailer.key) {
    let htmlTrailer = `<iframe
      title="${data.original_title}"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/${videoTrailer.key}?autoplay=0&mute=1&controls=1&fullscreen=1"
    ></iframe>`;

    document.querySelector(".trailer").innerHTML = htmlTrailer;
  }
}

function renderButtons() {
  let html = `<div class="btn-likes">
    <div class="btn-nolike-group">
      <svg class="btn" id="btn-nolike" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
        <path
          d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z" />
      </svg>
      <svg class="btn" id="btn-nolike-marked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
        <path
          d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" />
      </svg>
    </div>
    <div class="btn-like-group">
      <svg class="btn" id="btn-like" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
        <path
          d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
      </svg>
      <svg class="btn" id="btn-like-marked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
        <path
          d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
      </svg>
    </div>
  </div>
  <div class="btn-mylist">
    <div class="btn-mylist-group">
      <svg class="btn" id="btn-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
        <path
          d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
      <svg class="btn" id="btn-checked" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512" width="20" height="20">
        <path
          d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm96 64a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm104 0c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm-72-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM96 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
      </svg>
    </div>
    <small>MyList</small>
  </div>`;

  document.querySelector(".buttons").innerHTML = html;
  const isLike = isInLocalStorage(MOVIES_LIKE, MOVIE_ID);
  const isNoLike = isInLocalStorage(MOVIES_NO_LIKE, MOVIE_ID);
  const isListed = isInLocalStorage(MY_LIST, MOVIE_ID);

  if (isLike) {
    toggleButton("#btn-like-marked", "#btn-like");
  } else {
    toggleButton("#btn-like", "#btn-like-marked");
  }
  if (isNoLike) {
    toggleButton("#btn-nolike-marked", "#btn-nolike");
  } else {
    toggleButton("#btn-nolike", "#btn-nolike-marked");
  }
  if (isListed) {
    toggleButton("#btn-checked", "#btn-check");
  } else {
    toggleButton("#btn-check", "#btn-checked");
  }
}

function extractCreditInfo(data) {
  if (!data) {
    document.querySelector(".container").innerHTML = "<p>Movie NOT Found</p>";
    return;
  }
  const casting = data.cast
    .slice(0, 10)
    .map((i) => i.original_name)
    .join(", ");
  const director = data.crew.find(
    (i) => i.department == "Directing" && i.job == "Director"
  ).original_name;

  return {
    casting,
    director,
  };
}

function renderComments() {
  let html = "";
  const data = JSON.parse(localStorage.getItem(MOVIE_COMMENTS));
  if (data && data.length > 0) {
    const movie = data.find((m) => m.movie_id == MOVIE_ID);
    if (movie) {
      movie.comments.forEach((c) => {
        html += `<div class="comment">
          <h4>${c.user}</h4>
          <small>${convertTimestampToDateTime(c.timestamp)}</small>
          <p>${c.message}</p>
        </div>`;
      });

      document.querySelector(".comment-items").innerHTML = html;
      return;
    }
  }
  document.querySelector(".comment-items").innerHTML =
    '<div class="no-comments"><span>There are no comments on this movie yet</span></div.';
}

function addComment(user, message) {
  const timestamp = dateToTimestamp(new Date());
  const newComment = {
    id: timestamp,
    user,
    message,
    timestamp,
  };

  const movieComments = JSON.parse(localStorage.getItem(MOVIE_COMMENTS));
  if (movieComments && movieComments.length > 0) {
    const movie = movieComments.find((m) => m.movie_id == MOVIE_ID);
    if (movie) {
      movie.comments.push(newComment);
      localStorage.setItem(MOVIE_COMMENTS, JSON.stringify(movieComments));
    } else {
      movieComments.push({
        movie_id: MOVIE_ID,
        comments: [newComment],
      });
      localStorage.setItem(MOVIE_COMMENTS, JSON.stringify(movieComments));
    }
  } else {
    localStorage.setItem(
      MOVIE_COMMENTS,
      JSON.stringify([
        {
          movie_id: MOVIE_ID,
          comments: [newComment],
        },
      ])
    );
  }
}

function cleanForm() {
  document.querySelector("#username").value = "";
  document.querySelector("#comment").value = "";
}

function setEventListeners() {
  // No Like
  document.querySelector("#btn-nolike").addEventListener("click", function (e) {
    e.preventDefault();
    addToLocalStorage(MOVIES_NO_LIKE, MOVIE_ID);
    toggleButton("#btn-nolike-marked", "#btn-nolike");
    deleteFromLocalStorage(MOVIES_LIKE, MOVIE_ID);
    toggleButton("#btn-like", "#btn-like-marked");
  });

  document
    .querySelector("#btn-nolike-marked")
    .addEventListener("click", function (e) {
      e.preventDefault();
      deleteFromLocalStorage(MOVIES_NO_LIKE, MOVIE_ID);
      toggleButton("#btn-nolike", "#btn-nolike-marked");
    });
  // Like
  document.querySelector("#btn-like").addEventListener("click", function (e) {
    e.preventDefault();
    addToLocalStorage(MOVIES_LIKE, MOVIE_ID);
    toggleButton("#btn-like-marked", "#btn-like");
    deleteFromLocalStorage(MOVIES_NO_LIKE, MOVIE_ID);
    toggleButton("#btn-nolike", "#btn-nolike-marked");
  });

  document
    .querySelector("#btn-like-marked")
    .addEventListener("click", function (e) {
      e.preventDefault();
      deleteFromLocalStorage(MOVIES_LIKE, MOVIE_ID);
      toggleButton("#btn-like", "#btn-like-marked");
    });
  // My List
  document.querySelector("#btn-check").addEventListener("click", function (e) {
    e.preventDefault();
    addToLocalStorage(MY_LIST, MOVIE_ID);
    toggleButton("#btn-checked", "#btn-check");
  });

  document
    .querySelector("#btn-checked")
    .addEventListener("click", function (e) {
      e.preventDefault();
      deleteFromLocalStorage(MY_LIST, MOVIE_ID);
      toggleButton("#btn-check", "#btn-checked");
    });

  // Submit
  document.querySelector(".btn-submit").addEventListener("click", function (e) {
    e.preventDefault();
    let formData = new FormData(document.querySelector("form"));
    const user = formData.get("username");
    const message = formData.get("comment");

    if (!user || !message) {
      return;
    }
    addComment(user, message);
    cleanForm();
    renderComments();
  });
}

// Run
(async function Run() {
  const returnPage = localStorage.getItem(BEFORE_PAGE);
  const movieSearch = localStorage.getItem(MOVIE_SEARCH);

  const url = movieSearch
    ? `search.html?search=${encodeURIComponent(movieSearch)}`
    : `${returnPage || "index"}.html`;

  document.getElementById("return_page").setAttribute("href", url);

  await getMovieDetails();
  setEventListeners();
  renderComments();
})();
