import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';
import { getTasks, createTask, updateTaskStatus, deleteTask } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load all tasks on initial component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Fetch tasks from Express backend
  const loadTasks = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  // Flash temporary success notification
  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // 1. Create a task and update UI immediately
  const handleCreateTask = async (taskPayload) => {
    try {
      setSubmitting(true);
      setErrorMessage('');
      const newTask = await createTask(taskPayload);

      // Prepend newly created task to state
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      showSuccess('Task added successfully!');
      return true;
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create task');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 2. Change task status and update UI immediately
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setErrorMessage('');
      const updated = await updateTaskStatus(taskId, newStatus);

      // Replace updated task in local state
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updated : task))
      );
      showSuccess('Status updated!');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update status');
    }
  };

  // 3. Delete a task and update UI immediately
  const handleDeleteTask = async (taskId) => {
    try {
      setErrorMessage('');
      await deleteTask(taskId);

      // Filter out deleted task from local state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      showSuccess('Task deleted successfully!');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to delete task');
    }
  };

  // Categorize tasks by status into 3 distinct sections
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <div className="dashboard-container">
      <Navbar totalTasks={tasks.length} completedTasks={doneTasks.length} />

      <main className="dashboard-main">
        {/* Error notification banner */}
        {errorMessage && (
          <div className="alert alert-error">
            <span>⚠️ {errorMessage}</span>
            <button className="alert-close" onClick={() => setErrorMessage('')}>
              ✕
            </button>
          </div>
        )}

        {/* Success notification banner */}
        {successMessage && (
          <div className="alert alert-success">
            <span>✓ {successMessage}</span>
          </div>
        )}

        {/* Task creation form */}
        <TaskForm onAddTask={handleCreateTask} submitting={submitting} />

        {/* Task Kanban / Columns Board */}
        <section className="tasks-board">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading tasks from server...</p>
            </div>
          ) : (
            <div className="columns-grid">
              <TaskColumn
                title="Todo"
                statusKey="todo"
                tasks={todoTasks}
                onStatusChange={handleStatusChange}
                onDeleteTask={handleDeleteTask}
              />
              <TaskColumn
                title="In Progress"
                statusKey="in_progress"
                tasks={inProgressTasks}
                onStatusChange={handleStatusChange}
                onDeleteTask={handleDeleteTask}
              />
              <TaskColumn
                title="Done"
                statusKey="done"
                tasks={doneTasks}
                onStatusChange={handleStatusChange}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
