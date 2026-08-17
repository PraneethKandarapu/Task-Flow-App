import { useCallback, useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import EditTaskForm from "../components/EditTaskForm";
import TaskFilters from "../components/TaskFilters";
import Pagination from "../components/Pagination";

import { getTasks, getTaskById, deleteTask } from "../services/api";

function Dashboard({ user, token, onLogout }) {
  const [tasks, setTasks] = useState([]);

  const [pagination, setPagination] = useState({
    totalTasks: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    sort: "",
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError("");

      try {
        const result = await getTasks(token, {
          ...filters,
          page,
          limit: 10,
        });

        if (!result.ok) {
          setError(result.data.message || "Unable to load tasks.");
          return;
        }

        setTasks(result.data.tasks);
        setPagination(result.data.pagination);
      } catch (err) {
        setError("Unable to load tasks.");
      } finally {
        setLoading(false);
      }
    },
    [token, filters],
  );

  useEffect(() => {
    loadTasks(1);
  }, [loadTasks]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
      sort: "",
    });
  };

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

  const handleEditTask = (task) => {
    setEditingTask(task);
    setSelectedTask(null);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)),
    );

    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      const result = await deleteTask(taskId, token);

      if (!result.ok) {
        setError(result.data.message);
        return;
      }

      setTasks((prev) => prev.filter((task) => task._id !== taskId));

      if (selectedTask?._id === taskId) {
        setSelectedTask(null);
      }

      loadTasks(pagination.currentPage);
    } catch (err) {
      setError("Unable to delete task.");
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
            <strong>{pagination.totalTasks}</strong>
            <span>Tasks</span>
          </div>
        </div>

        {error && <div className="message error">{error}</div>}

        <TaskForm token={token} onTaskCreated={handleTaskCreated} />

        <section className="tasks-section">
          <div className="section-heading">
            <h2>Your tasks</h2>
            <p>Search, filter and organize your work.</p>
          </div>

          <TaskFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />

          {loading ? (
            <p className="loading-text">Loading tasks...</p>
          ) : (
            <>
              <TaskList
                tasks={tasks}
                onTaskClick={handleTaskClick}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={loadTasks}
              />
            </>
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

        {editingTask && (
          <div className="edit-overlay">
            <EditTaskForm
              task={editingTask}
              token={token}
              onUpdated={handleTaskUpdated}
              onCancel={() => setEditingTask(null)}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
