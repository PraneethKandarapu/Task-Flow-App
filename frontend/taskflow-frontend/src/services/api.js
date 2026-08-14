const API_URL = "http://localhost:5000/api/v1";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    data,
  };
};