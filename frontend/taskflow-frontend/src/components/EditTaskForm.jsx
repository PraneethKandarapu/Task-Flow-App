import { useState } from "react";
import { updateTask } from "../services/api";

function EditTaskForm({ task, token, onUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.substring(0, 10) : "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await updateTask(task._id, formData, token);

      if (!result.ok) {
        setError(result.data.message);
        return;
      }

      onUpdated(result.data.task);
    } catch (err) {
      setError("Unable to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-task-card">
      <div className="section-heading">
        <h2>Edit task</h2>
        <p>Update the details of your task.</p>
      </div>

      {error && <div className="message error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task title"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <div className="form-row">
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <div className="edit-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskForm;
