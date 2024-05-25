const buttonMenu = document.querySelector("#menu");
const navbar = document.querySelector(".navigation");

buttonMenu.addEventListener("click", () => {
  navbar.classList.toggle("open");
  buttonMenu.classList.toggle("open");
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  // Add more temple objects here...
  {
    templeName: "Adelaide Australia Temple",
    location: "Marden, South Australia, Australia",
    dedicated: "2000, June, 15",
    area: 10700,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/adelaide-australia/400x225/adelaide-australia-temple-lds-866420-wallpaper.jpg",
  },
  {
    templeName: "Bern Switzerland Temple",
    location: "Zollikofen, Bern, Switzerland",
    dedicated: "1955, September, 11",
    area: 39063,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bern-switzerland/400x250/bern-switzerland-temple-lds-784288-wallpaper.jpg",
  },
  {
    templeName: "Caracas Venezuela Temple",
    location: "Caracas, Dependencias Federales, Venezuela",
    dedicated: "2000, August, 20",
    area: 15332,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/caracas-venezuela/400x225/caracas_venezuela_temple_detail_1691066_2400x1200.jpg",
  },
];

const filterOptions = {
  home: function (temple) {
    return temple;
  },
  old: function (temple) {
    const year = parseInt(temple.dedicated.split(",")[0]);
    return year < 1900;
  },
  new: function (temple) {
    const year = parseInt(temple.dedicated.split(",")[0]);
    return year > 2000;
  },
  large: function (temple) {
    return temple.area > 90000;
  },
  small: function (temple) {
    return temple.area < 10000;
  },
};

const createTempleSection = (filterOption = "home") => {
  filterBy = filterOption.toLowerCase();
  if (filterOptions[filterBy]) {
    const filteredTemples = temples.filter(
      filterOptions[filterBy.toLowerCase()]
    );
    const sectionTemples = filteredTemples.map(
      (temple) => `<section class="card">
        <h3>${temple.templeName}</h3>
        <div class="card-info">
          <p><span>LOCATION: </span>${temple.location}</p>
          <p><span>DEDICATED: </span>${temple.dedicated}</p>
          <p><span>SIZE: </span>${temple.area} sq ft</p>
        </div>
        <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" width="400" height="250">
      </section>`
    );
    document.querySelector(".container").innerHTML = sectionTemples.join("");
  } else {
    document.querySelector(".container").innerHTML =
      "There is no data related to this filter.";
  }
};

function addClassActive(anchorElement) {
  document.querySelectorAll("a").forEach((nodeAnchor) => {
    if (nodeAnchor.classList.contains("active")) {
      nodeAnchor.classList.remove("active");
    }
  });
  anchorElement.classList.add("active");
}

function convertSingleWordToTitle(word) {
  const wordLow = word.toLowerCase();
  return wordLow
    .split("")
    .map((i) => (wordLow[0] == i ? i.toUpperCase() : i))
    .join("");
}

//  Start Application
createTempleSection();

document.querySelectorAll("a").forEach((nodeAnchor) => {
  nodeAnchor.addEventListener("click", (e) => {
    e.preventDefault();
    addClassActive(e.target);
    const filterTitle = e.target.attributes.title.value || null;
    if (filterTitle) {
      document.querySelector("#page").textContent =
        convertSingleWordToTitle(filterTitle);
      createTempleSection(filterTitle);
    }
  });
});
