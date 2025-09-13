import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // NEW state

  // Clear inputs when component mounts
  useEffect(() => {
    setEmail("");
    setPassword("");
    setMessage("");
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true); // show loading
    try {
      const res = await axios.post(`${API_URL}/api/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      if (onLoginSuccess) onLoginSuccess(res.data.token);
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false); // stop loading whether success or fail
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {loading && <p>Please wait... connecting to server</p>} {/* loading message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
