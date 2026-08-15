import { useState } from "react";
import { createTask } from "../services/api";

function TaskForm({ token, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
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
      const result = await createTask(formData, token);

      if (!result.ok) {
        setError(result.data.message);
        return;
      }

      onTaskCreated(result.data.task);

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
    } catch (err) {
      setError("Unable to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-card">
      <div className="section-heading">
        <h2>Create a task</h2>
        <p>Add something you need to get done.</p>
      </div>

      {error && <div className="message error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="form-row">
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
