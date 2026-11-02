// Top navigation header showing app title and task counts
function Navbar({ totalTasks, completedTasks }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h1>Personal Task Manager</h1>
        <p className="navbar-subtitle">MERN Stack Dashboard</p>
      </div>

      <div className="navbar-stats">
        <span className="stat-badge">
          Total Tasks: <strong>{totalTasks}</strong>
        </span>
        <span className="stat-badge stat-completed">
          Completed: <strong>{completedTasks}</strong>
        </span>
      </div>
    </header>
  );
}

export default Navbar;
