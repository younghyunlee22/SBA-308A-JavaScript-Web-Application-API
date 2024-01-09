export function displayTodos(todos) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  todos.sort((a, b) => a.id - b.id);

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.innerHTML = `
      <p>${todo.id}: ${todo.todo}</p>
      <p>User ID: ${todo.userId}</p>
      <p>Completed: ${todo.completed ? "Yes" : "No"}</p>
      <hr/>
    `;
    todoList.appendChild(todoItem);
  });
}
