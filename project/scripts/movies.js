localStorage.setItem(BEFORE_PAGE, "index");
// Run
(async function Run() {
  const data = await fetchFromTMDB("trending");
  if (data && data.results) {
    createMovieSection(data.results);
  }
})();
