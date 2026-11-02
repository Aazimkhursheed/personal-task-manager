import TaskCard from './TaskCard';

// Section/Column component for grouping tasks by status (Todo, In Progress, Done)
function TaskColumn({ title, statusKey, tasks, onStatusChange, onDeleteTask }) {
  return (
    <div className={`task-column column-${statusKey}`}>
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-count">{tasks.length}</span>
      </div>

      <div className="column-content">
        {tasks.length === 0 ? (
          <div className="column-empty">
            <p>No tasks in this section</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={onStatusChange}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskColumn;
