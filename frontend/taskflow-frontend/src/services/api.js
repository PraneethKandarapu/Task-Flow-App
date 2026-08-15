const API_URL = "http://localhost:5000/api/v1";

const request = async (url, options = {}) => {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};

export const registerUser = async (userData) => {
  return request("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (userData) => {
  return request("/users/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const getTasks = async (token) => {
  return request("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTaskById = async (taskId, token) => {
  return request(`/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTask = async (taskData, token) => {
  return request("/tasks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
};
