// Individual task card displaying details, status changer, and delete action
function TaskCard({ task, onStatusChange, onDeleteTask }) {
  // Format the due date into a readable string (e.g., "Nov 15, 2026")
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formattedDate = formatDueDate(task.dueDate);

  return (
    <div className={`task-card priority-${task.priority}`}>
      <div className="task-card-header">
        <h3 className="task-card-title">{task.title}</h3>
        <span className={`badge badge-priority badge-${task.priority}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="task-card-desc">{task.description}</p>
      )}

      <div className="task-card-meta">
        {formattedDate ? (
          <span className="task-date">
            📅 Due: <strong>{formattedDate}</strong>
          </span>
        ) : (
          <span className="task-date-empty">No due date</span>
        )}
      </div>

      <div className="task-card-footer">
        <div className="status-control">
          <label htmlFor={`status-${task._id}`} className="status-label">
            Status:
          </label>
          <select
            id={`status-${task._id}`}
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className="status-dropdown"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button
          onClick={() => onDeleteTask(task._id)}
          className="btn-delete"
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
