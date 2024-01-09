export async function getTodos(limit, page) {
  try {
    const response = await axios.get(
      `https://dummyjson.com/todos?limit=${limit}&skip=${(page - 1) * limit}`
    );
    return response.data.todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}
