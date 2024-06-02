localStorage.setItem(BEFORE_PAGE, "search");
const search = new URLSearchParams(window.location.search).get("search");
// Run
(async function Run() {
  let data = [];
  if (search) {
    data = await fetchFromTMDB("query", search);
    localStorage.setItem(MOVIE_SEARCH, search);
  }

  if (data && data.results) {
    createMovieSection(data.results);
  }
})();
