export async function getTodos() {
  try {
    const response = await axios.get("https://dummyjson.com/todos?limit=10");
    return response.data.todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}
