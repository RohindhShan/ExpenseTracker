import React, { useState } from "react";
import Dashboard from "./components/Dashboard";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : "https://expensetracker-cowu.onrender.com";

function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken") || "");
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        setUsername("");
        setPassword("");
      } else {
        alert(data.error || "Login Failed");
      }
    } catch (err) {
      alert("Backend connection failed.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Account Created successfully! Please login.");
        setIsRegistering(false);
        setUsername("");
        setPassword("");
      } else {
        alert(data.error || "Registration Failed");
      }
    } catch (err) {
      alert("Network error connecting to backend.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setToken("");
  };

  const authStyles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#111827",
      color: "#fff",
      fontFamily: "'Poppins', sans-serif",
    },
    box: {
      backgroundColor: "#182235",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      width: "320px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #3b82f6",
      backgroundColor: "#111827",
      color: "#fff",
      boxSizing: "border-box",
    },
    btn: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      marginTop: "10px",
    },
    toggle: {
      color: "#94a3b8",
      fontSize: "0.85rem",
      marginTop: "15px",
      cursor: "pointer",
    },
  };

  if (!token) {
    return (
      <div style={authStyles.container}>
        <div style={authStyles.box}>
          <h2>{isRegistering ? "Register Matrix" : "Login Portal"}</h2>
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <input
              type="text"
              placeholder="Username"
              style={authStyles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={authStyles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" style={authStyles.btn}>
              {isRegistering ? "CREATE ACCOUNT" : "ENTER TERMINAL"}
            </button>
          </form>
          <p
            style={authStyles.toggle}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Already registered? Login matrix"
              : "New user? Create terminal instance"}
          </p>
        </div>
      </div>
    );
  }

  return <Dashboard token={token} handleLogout={handleLogout} />;
}

export default App;
