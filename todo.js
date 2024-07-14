const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value.trim();
    
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.classList.add("close");
    li.appendChild(span);
    
    // Add event listener to delete task when close button (span) is clicked
    span.addEventListener("click", function () {
      li.remove();
      saveData();
    });
    
    // Create edit button
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", function () {
      editTask(li);
    });
    li.appendChild(editBtn);
    
    listContainer.appendChild(li);
    inputBox.value = "";
    
    saveData();
  }
}

// Event listener to toggle task completion on click
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

// Function to save tasks to local storage
function saveData() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

// Function to display saved tasks from local storage
function displayData() {
  if (localStorage.getItem("tasks")) {
    listContainer.innerHTML = localStorage.getItem("tasks");
    let tasks = listContainer.querySelectorAll("li");
    tasks.forEach(function(task) {
      let editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.classList.add("edit");
      editBtn.addEventListener("click", function () {
        editTask(task);
      });
      task.appendChild(editBtn);
    });
  }
}

// Display saved tasks when the page loads
displayData();

// Function to edit a task
function editTask(liElement) {
  let newText = prompt("Edit your task:", liElement.textContent.trim());
  if (newText !== null && newText.trim() !== "") {
    liElement.textContent = newText.trim();
    
    // Create close (delete) button for the edited task
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.classList.add("close");
    liElement.appendChild(span);
    
    // Add event listener to delete task when close button (span) is clicked
    span.addEventListener("click", function () {
      liElement.remove();
      saveData();
    });
    
    // Create edit button for the edited task
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", function () {
      editTask(liElement);
    });
    liElement.appendChild(editBtn);
    
    saveData();
  }
}
