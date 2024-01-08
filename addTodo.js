const myForm = document.getElementById("pomodoro-form");
let taskList = document.getElementById("child-ol");

// Function to handle the POST request
export async function handleAddTask(e) {
  try {
    e.preventDefault();
    const minutes = myForm.minute.value;
    const task = myForm.task.value;
    const isValid = validateTaskForm(minutes, task);
    if (isValid) {
      const response = await axios.post("https://dummyjson.com/todos/add", {
        minutes: minutes,
        todo: task,
        completed: false,
        userId: 6,
      });

      const newTodo = response.data;
      console.log("New todo created:", newTodo);

      const newLi = document.createElement("li");
      newLi.innerHTML = `<p>For ${minutes} minutes: ${newTodo.todo}. <button class="remove-button">Remove</button>
      `;
      taskList.appendChild(newLi);

      const liCollection = document.querySelectorAll("#child-ol li");

      const breakTime = document.createElement("p");
      // Iterate over a collection of elements to add a break time to the list
      liCollection.forEach((item, index) => {
        if ((index + 1) % 4 == 0) {
          breakTime.innerHTML = `Take a 20-minute break. <br/>
    <img id="tomato-icon" src="./images/favicon-32x32.png" alt="tomato-icon"><img id="tomato-icon" src="./images/favicon-32x32.png" alt="tomato-icon"><img id="tomato-icon" src="./images/favicon-32x32.png" alt="tomato-icon"><img id="tomato-icon" src="./images/favicon-32x32.png" alt="tomato-icon"><hr/>`;
          newLi.appendChild(breakTime);
        } else {
          breakTime.innerHTML = `Take a 5-minute break.<hr/>`;
          newLi.appendChild(breakTime);
        }
      });
    }
  } catch (error) {
    console.error("Error creating todo:", error);
  }
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
