import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Clear inputs when component mounts
  useEffect(() => {
    setEmail("");
    setPassword("");
    setMessage("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
     const res = await axios.post(`${API_URL}/api/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      if (onLoginSuccess) onLoginSuccess(res.data.token);
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
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
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
