export function displayTodos(todos) {
  const todoList = document.createElement("div");

  todos.sort((a, b) => a.userId - b.userId);

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.innerHTML = `
      <p>User ID: ${todo.userId}</p>
      <p>Task: ${todo.todo}</p>
      <p>Completed: ${todo.completed ? "Yes" : "No"}</p>
      <hr/>
    `;
    todoList.appendChild(todoItem);
  });

  document.body.appendChild(todoList);
}
