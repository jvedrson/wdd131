localStorage.setItem(BEFORE_PAGE, "lists");

// Run
async function renderMovies(selector, data = []) {
  if (!selector) return;

  if (data && data.length > 0) {
    const movies = await Promise.all(
      data.map(async (movie_id) => {
        const movie = await fetchFromTMDB("details", movie_id);
        if (movie) return movie;
      })
    );
    const html = await createMoviesHTML(movies);
    document.querySelector(selector).innerHTML = html.join("");
  } else {
    document.querySelector(selector).innerHTML =
      "<span>There are no registered movies.<span>";
  }
}

(async function Run() {
  const myListLocal = JSON.parse(localStorage.getItem(MY_LIST));
  const likeLocal = JSON.parse(localStorage.getItem(MOVIES_LIKE));
  const noLikeLocal = JSON.parse(localStorage.getItem(MOVIES_NO_LIKE));

  await renderMovies(".my-list", myListLocal);
  await renderMovies(".my-list-like", likeLocal);
  await renderMovies(".my-list-nolike", noLikeLocal);
})();
