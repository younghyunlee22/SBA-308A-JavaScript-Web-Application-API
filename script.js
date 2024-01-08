import { getTodos } from "./getTodo.js";
import { displayTodos } from "./display.js";
import { handleAddTask } from "./addTodo.js";

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

let taskList = document.getElementById("child-ol");

myForm.addEventListener("submit", handleAddTask);

// Remove a task
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-button")) {
    const taskItem = e.target.closest("li");
    if (taskItem) {
      taskItem.remove();
    }
  }
});

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
