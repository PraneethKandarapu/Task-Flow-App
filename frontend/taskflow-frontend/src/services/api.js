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

// AUTH

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

// TASKS

export const getTasks = async (
  token,
  {
    search = "",
    status = "",
    priority = "",
    sort = "",
    page = 1,
    limit = 10,
  } = {},
) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (status) params.set("status", status);
  if (priority) params.set("priority", priority);
  if (sort) params.set("sort", sort);

  params.set("page", page);
  params.set("limit", limit);

  return request(`/tasks?${params.toString()}`, {
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

export const getTaskById = async (taskId, token) => {
  return request(`/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = async (taskId, taskData, token) => {
  return request(`/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
};

export const deleteTask = async (taskId, token) => {
  return request(`/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
