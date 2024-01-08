import { getTodos } from "./getTodo.js";
import { displayTodos } from "./display.js";

console.log("hi");

let userName = document.getElementById("username");

let plannerTitle = document.querySelector(".title");

const tomatoIcon = document.getElementById("tomato-icon");

const enterButton = document.getElementById("username-button");
const getTodoButton = document.getElementById("todoExamples");

// Plug in username into innerHTML
enterButton.addEventListener("click", function () {
  const inputUserName = userName.value;
  if (inputUserName.length > 1 && inputUserName.length < 16) {
    plannerTitle.innerHTML = `<img id="tomato-icon" src="./images/favicon-32x32.png" alt="tomato-icon"> ${inputUserName}'s pomodoro plan for today <img id="tomato-icon" src="./images/favicon-32x32.png" alt="tomato-icon"> `;
  }
});

let myForm = document.getElementById("pomodoro-form");

let taskList = document.getElementById("child-ol");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const minutes = myForm.minute.value;
  const task = myForm.task.value;
  const isValid = validateTaskForm(minutes, task);

  if (isValid) {
    const newLi = document.createElement("li");
    newLi.innerHTML = `For ${minutes} minutes: ${task}.<button class="remove-button">Remove</button>`;
    taskList.appendChild(newLi);

    const liCollection = document.querySelectorAll("#child-ol li");

    const breakTime = document.createElement("p");
    // Iterate over a collection of elements to add a break time to the list
    liCollection.forEach((item, index) => {
      if ((index + 1) % 4 == 0) {
        breakTime.innerHTML = `Take a 20-minute break. <br/>
    <img id="tomato-icon" src="./images/favicon-32x32.png" alt="tomato-icon"><img id="tomato-icon" src="./images/favicon-32x32.png" alt="tomato-icon"><img id="tomato-icon" src="./images/favicon-32x32.png" alt="tomato-icon"><img id="tomato-icon" src="./images/favicon-32x32.png" alt="tomato-icon">`;
        newLi.appendChild(breakTime);
      } else {
        breakTime.innerHTML = `Take a 5-minute break.`;
        newLi.appendChild(breakTime);
      }
    });
  }
});

function clearInput() {
  myForm.task.value = "";
}

// DOM event-based validation
function validateTaskForm(minutes, task) {
  if (minutes < 5 || minutes > 90) {
    // BOM 1. alert
    alert("mininum 5 mins, maximum 90 mins");
    return false;
  }
  if (task.trim() == "") {
    alert("Enter a task");
    return false;
  }
  return true;
}

// Remove a task
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-button")) {
    const taskItem = e.target.closest("li");
    if (taskItem) {
      taskItem.remove();
    }
  }
});

// HTML templating with the cloneNode method, Use appendChild
const nodeCurrPlan = document.querySelector(".pomodoro-list");
const duplicateButton = document.getElementById("duplicate-button");
duplicateButton.addEventListener("click", function () {
  // BOM 2. confirm
  const confirmation = confirm("Do you want to duplicate?");
  if (confirmation == false) {
    return;
  }
  const clone = taskList.cloneNode(true);
  nodeCurrPlan.appendChild(clone);
});

// Remove the last child
const undoButton = document.getElementById("undo-duplicate");
undoButton.addEventListener("click", function () {
  // console.log("lastChild", nodeCurrPlan.lastChild);
  const duplicatedChild = nodeCurrPlan.lastChild;
  nodeCurrPlan.removeChild(duplicatedChild);
});

// Modify font-family attribute in response to user interaction
// Modify the style of a div element in response to user interaction
const fontOptionsForm = document.getElementById("font-options");
const fontSelect = document.getElementById("font");

fontOptionsForm.addEventListener("change", function (e) {
  e.preventDefault();

  const selectedFont = fontSelect.value;
  const listDiv = document.getElementById("parent-list");
  listDiv.style.fontFamily = `${selectedFont}`;
});

getTodoButton.addEventListener("click", handleGetTodo);
async function handleGetTodo() {
  try {
    const todosArr = await getTodos();
    console.log(todosArr);

    displayTodos(todosArr);
  } catch (error) {
    console.error("handleGetTodo", error);
  }
}
