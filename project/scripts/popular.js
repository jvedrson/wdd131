let localPage = JSON.parse(localStorage.getItem(PAGE_POPULAR));
localStorage.setItem(BEFORE_PAGE, "popular");

// Run
(async function Run(pageSelected = localPage || 1) {
  const data = await fetchFromTMDB("popular", undefined, pageSelected);
  if (data && data.results) {
    await createMovieSection(data.results);
    document.querySelectorAll(".numberPage").forEach((node) => {
      node.textContent = `page ${pageSelected}`;
      node.style.marginLeft = "0.5rem";
      node.style.fontStyle = "italic";
    });
    if (data.total_pages > 1) {
      const pagination = createPagination(data.page, data.total_pages);
      document.querySelector(".pagination").innerHTML += pagination;
      document.querySelectorAll(".btn-pagination").forEach((node) => {
        node.addEventListener("click", async function (e) {
          e.preventDefault();
          const goTo = e.target.dataset.page;
          if (Number(goTo) !== Number(data.page)) {
            localStorage.setItem(PAGE_POPULAR, JSON.stringify([goTo]));
            document.querySelector(".container").innerHTML = "";
            document.querySelector(".pagination").innerHTML = "";
            document.querySelector(".numberPage").innerHTML = "";
            window.scrollTo(0, 0);
            await Run(goTo);
          }
        });
      });
    }
  }
})();
