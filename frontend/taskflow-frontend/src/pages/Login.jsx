import { useState } from "react";
import { loginUser } from "../services/api";

function Login({ onLogin, onRegisterClick }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const result = await loginUser(formData);

      if (!result.ok) {
        setError(result.data.message);
        return;
      }

      const { user, token } = result.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      onLogin(user, token);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <div className="brand-icon">T</div>
          <span>TaskFlow</span>
        </div>

        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to continue to your tasks.</p>

        {error && <div className="message error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="switch-text">
          Don't have an account?{" "}
          <button className="link-button" onClick={onRegisterClick}>
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
