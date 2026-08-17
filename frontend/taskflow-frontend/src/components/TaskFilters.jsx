function TaskFilters({ filters, onChange, onReset }) {
  return (
    <div className="task-filters">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => onChange("status", e.target.value)}
      >
        <option value="">All statuses</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => onChange("priority", e.target.value)}
      >
        <option value="">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={filters.sort}
        onChange={(e) => onChange("sort", e.target.value)}
      >
        <option value="">Default order</option>
        <option value="dueDate">Due date ↑</option>
        <option value="-dueDate">Due date ↓</option>
      </select>

      <button type="button" className="reset-button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default TaskFilters;
