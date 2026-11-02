// Base API URL pointing to the Express backend
const API_BASE_URL = 'http://localhost:5000/tasks';

// 1. Fetch all tasks from the server
export const getTasks = async () => {
  const response = await fetch(API_BASE_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch tasks');
  }

  return data.data; // Array of task objects
};

// 2. Create a new task
export const createTask = async (taskData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create task');
  }

  return data.data; // Newly created task object
};

// 3. Update task status
export const updateTaskStatus = async (taskId, newStatus) => {
  const response = await fetch(`${API_BASE_URL}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update task status');
  }

  return data.data; // Updated task object
};

// 4. Delete a task
export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/${taskId}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete task');
  }

  return data;
};
