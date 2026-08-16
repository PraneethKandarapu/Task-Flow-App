function TaskList({ tasks, onTaskClick, onEditTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks yet</h3>
        <p>Create your first task to get started.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-card" key={task._id}>
          <div
            className="task-card-content"
            onClick={() => onTaskClick(task._id)}
          >
            <div className="task-card-top">
              <h3>{task.title}</h3>

              <span className={`priority ${task.priority}`}>
                {task.priority}
              </span>
            </div>

            {task.description && (
              <p className="task-description">{task.description}</p>
            )}

            <div className="task-meta">
              <span>{task.status}</span>

              {task.dueDate && (
                <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          <div className="task-actions">
            <button className="edit-button" onClick={() => onEditTask(task)}>
              Edit
            </button>

            <button
              className="delete-button"
              onClick={() => onDeleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
