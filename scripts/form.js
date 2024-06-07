const products = [
  {
    value: "amd-r9-7950x3d",
    name: "AMD Ryzen 9 7950X3D",
  },
  {
    value: "amd-r9-5900x",
    name: "AMD Ryzen 9 5900X",
  },
  {
    value: "amd-r7-7800x3d",
    name: "AMD Ryzen 7 7800X3D",
  },
  {
    value: "amd-r5-5600x",
    name: "AMD Ryzen 5 5600X",
  },
  {
    value: "i9-14900k",
    name: "Intel® CoreTM i9-14900K",
  },
  {
    value: "i9-13900k",
    name: "Intel Core i9-13900K",
  },
  {
    value: "i7-14700k",
    name: "Intel Core i7-14700K",
  },
  {
    value: "i7-13700k",
    name: "Intel Core i7-13700K",
  },
];

function renderProducts(products) {
  const productSelect = document.querySelector("#pName");
  products.forEach((p) => {
    const optionElement = document.createElement("option");
    optionElement.value = p.value;
    optionElement.text = p.name;
    productSelect.appendChild(optionElement);
  });
}

renderProducts(products);

document.querySelector("#handleSubmit").addEventListener("click", (e) => {
  const formIsValid = document.forms["fm1"].reportValidity();
  if (formIsValid) {
    const uReviews = Number(localStorage.getItem("user_reviews"));
    localStorage.setItem("user_reviews", uReviews + 1);
  }
});
