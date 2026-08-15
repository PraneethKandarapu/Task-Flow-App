import { useState } from "react";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [page, setPage] = useState("login");

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
    setPage("login");
  };

  if (user && token) {
    return <Dashboard user={user} token={token} onLogout={handleLogout} />;
  }

  if (page === "register") {
    return <Register onLoginClick={() => setPage("login")} />;
  }

  return (
    <Login onLogin={handleLogin} onRegisterClick={() => setPage("register")} />
  );
}

export default App;
