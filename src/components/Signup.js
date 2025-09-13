import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const Signup = ({ onSignupSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // NEW state

  // Clear inputs when component mounts
  useEffect(() => {
    setName("");
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
      const res = await axios.post(`${API_URL}/api/signup`, {
        name,
        email,
        password,
      });
      setMessage(res.data.message);
      if (onSignupSuccess) onSignupSuccess();
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false); // hide loading when request finishes
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          {loading ? "Please wait..." : "Signup"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
