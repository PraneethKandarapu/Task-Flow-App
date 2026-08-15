import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTaskById, getTasks } from "../services/api";

function Dashboard({ user, token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const result = await getTasks(token);

        if (!result.ok) {
          setError(result.data.message);
          return;
        }

        setTasks(result.data.tasks);
      } catch (err) {
        setError("Unable to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [token]);

  const handleTaskCreated = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const handleTaskClick = async (taskId) => {
    try {
      const result = await getTaskById(taskId, token);

      if (!result.ok) {
        setError(result.data.message);
        return;
      }

      setSelectedTask(result.data.task);
    } catch (err) {
      setError("Unable to load task.");
    }
  };

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} />

      <main className="dashboard-content">
        <div className="welcome">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>Good to see you, {user?.name}.</h1>
            <p>Stay focused and keep moving forward.</p>
          </div>

          <div className="task-count">
            <strong>{tasks.length}</strong>
            <span>Tasks</span>
          </div>
        </div>

        {error && <div className="message error">{error}</div>}

        <TaskForm token={token} onTaskCreated={handleTaskCreated} />

        <section className="tasks-section">
          <div className="section-heading">
            <h2>Your tasks</h2>
            <p>Everything you're currently working on.</p>
          </div>

          {loading ? (
            <p className="loading-text">Loading tasks...</p>
          ) : (
            <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
          )}
        </section>

        {selectedTask && (
          <div className="task-detail">
            <div className="detail-header">
              <h2>{selectedTask.title}</h2>

              <button
                className="close-button"
                onClick={() => setSelectedTask(null)}
              >
                ×
              </button>
            </div>

            <p>{selectedTask.description || "No description provided."}</p>

            <div className="detail-meta">
              <span>Status: {selectedTask.status}</span>
              <span>Priority: {selectedTask.priority}</span>

              {selectedTask.dueDate && (
                <span>
                  Due: {new Date(selectedTask.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
