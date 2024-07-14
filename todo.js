const inputBox = document.getElementById("input-box");
const ListContainer = document.getElementById("list-container");
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    ListContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    span.onclick = function () {
      li.remove();
      saveData();
    };
    let editBtn = document.createElement("button"); // Create edit button
    editBtn.innerHTML = "Edit"; // Button text
    editBtn.classList.add("edit"); // Add class for styling and event handling
    li.appendChild(editBtn); // Append edit button to li
    editBtn.onclick = function () {
      editTask(li); // Passes the li element to the editTask function
    };
    inputBox.value = "";
    saveData();
  }
}

ListContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      // checks if the clicked element is a <li>
      e.target.classList.toggle("checked"); //toggles 'checked ' class on the clicked '<li>'
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove(); //removes the li when a span inside it is clicked
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", ListContainer.innerHTML); //to store data in the browser
}

function displayData() {
  ListContainer.innerHTML = localStorage.getItem("data");
}
displayData();

function editTask(liElement) {
  let newText = prompt("Edit your task:", liElement.textContent.trim());
  if (newText !== null && newText.trim() !== "") {
    liElement.textContent = ""; // Clear existing content

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    liElement.appendChild(span);
    span.onclick = function () {
      liElement.remove();
      saveData();
    };

    let textNode = document.createTextNode(newText.trim());
    liElement.appendChild(textNode);

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("edit");
    editBtn.onclick = function () {
      editTask(liElement);
    };
    liElement.appendChild(editBtn);

    saveData();
  }
}
