import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/login";
import Watchlist from "./pages/watchlist";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [formKey, setFormKey] = useState(0); // force remount forms

  const handleLoginSuccess = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
    setFormKey(prev => prev + 1); // remount forms to clear inputs
  };

  if (isLoggedIn) {
    return (
      <div className="app-container">
        <div className="header">
          <h1>🎬 Movie Watchlist</h1>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <Watchlist token={token} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>🎬 Movie Watchlist</h1>
      {showLogin ? (
        <Login key={formKey} onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Signup key={formKey} onSignupSuccess={() => setShowLogin(true)} />
      )}
      <button
        className="toggle-button"
        onClick={() => setShowLogin(!showLogin)}
      >
        {showLogin ? "Go to Signup" : "Go to Login"}
      </button>
    </div>
  );
}

export default App;
