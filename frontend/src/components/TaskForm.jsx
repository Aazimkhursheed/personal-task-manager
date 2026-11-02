import { useState } from 'react';

// Form component for creating new tasks
function TaskForm({ onAddTask, submitting }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation: title cannot be empty or spaces
    if (!title.trim()) {
      setFormError('Task title is required');
      return;
    }

    setFormError('');

    // Safely parse optional due date
    let formattedDueDate = null;
    if (dueDate && !isNaN(new Date(dueDate).getTime())) {
      formattedDueDate = new Date(dueDate).toISOString();
    }

    // Prepare task payload
    const taskPayload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: formattedDueDate,
    };

    // Pass data to parent component
    const success = await onAddTask(taskPayload);

    // If successfully added, clear the form inputs
    if (success) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <section className="form-card">
      <h2 className="form-title">Create New Task</h2>

      {formError && <div className="form-error-alert">{formError}</div>}

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <div className="form-group flex-2">
            <label htmlFor="task-title">Title *</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Finish reading MongoDB chapter"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (formError) setFormError('');
              }}
              className="form-input"
            />
          </div>

          <div className="form-group flex-1">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group flex-1">
            <label htmlFor="task-duedate">Due Date</label>
            <input
              id="task-duedate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="task-description">Description (optional)</label>
          <textarea
            id="task-description"
            rows="2"
            placeholder="Add relevant notes, links, or instructions..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Adding Task...' : '+ Add Task'}
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
