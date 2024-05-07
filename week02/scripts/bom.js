const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

function addChapter() {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");

  li.textContent = input.value;

  deleteButton.textContent = "❌";
  deleteButton.addEventListener("click", function () {
    list.removeChild(li);
    input.focus();
  });

  li.appendChild(deleteButton);

  list.append(li);

  input.value = "";
}

button.addEventListener("click", function () {
  if (input.value.trim() !== "") {
    addChapter();
  }
  input.focus();
});

input.addEventListener("keyup", function (e) {
  if (input.value.trim() !== "" && e.keyCode == 13) {
    addChapter();
  }
  input.focus();
});
