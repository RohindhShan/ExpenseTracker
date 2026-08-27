import React, { useState } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  // Global token state persistence
  const [token, setToken] = useState(localStorage.getItem("userToken") || "");

  const handleSetToken = (userToken) => {
    localStorage.setItem("userToken", userToken);
    setToken(userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setToken("");
  };

  return (
    <div className="App">
      {token ? (
        // Renders your feature-rich premium dashboard directly when token exists
        <Dashboard token={token} handleLogout={handleLogout} />
      ) : (
        // Inline self-contained login and register framework interface
        <AuthWrapper setToken={handleSetToken} />
      )}
    </div>
  );
}

// Completely self-contained authentication matrix (No extra file imports required!)
function AuthWrapper({ setToken }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const styles = {
    authContainer: {
      backgroundColor: "#111827",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    },
    cardWrapper: {
      backgroundColor: "rgba(24, 31, 46, 0.95)",
      maxWidth: "420px",
      width: "100%",
      borderRadius: "24px",
      padding: "35px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxSizing: "border-box",
    },
    toggleFlex: {
      display: "flex",
      gap: "10px",
      marginBottom: "25px",
      width: "100%",
    },
    toggleBtn: (isActive) => ({
      flex: 1,
      padding: "10px",
      border: "none",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "0.9rem",
      cursor: "pointer",
      backgroundColor: isActive ? "#3b82f6" : "#1f293d",
      color: "#ffffff",
      transition: "all 0.3s",
    }),
    inputBox: {
      width: "100%",
      padding: "12px 14px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      backgroundColor: "#182235",
      boxSizing: "border-box",
      fontSize: "0.95rem",
      marginBottom: "15px",
      color: "#ffffff",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontSize: "0.85rem",
      color: "#94a3b8",
      fontWeight: "600",
    },
    submitBtn: (isRegister) => ({
      width: "100%",
      backgroundColor: isRegister ? "#10b981" : "#3b82f6",
      color: "#ffffff",
      padding: "14px",
      border: "none",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: "pointer",
      boxShadow: isRegister
        ? "0 4px 15px rgba(16, 185, 129, 0.2)"
        : "0 4px 15px rgba(59, 130, 246, 0.2)",
      marginTop: "10px",
    }),
    alertText: {
      color: "#ef4444",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      padding: "10px 14px",
      borderRadius: "10px",
      fontSize: "0.85rem",
      marginBottom: "15px",
      fontWeight: "500",
      textAlign: "center",
      border: "1px solid rgba(239, 68, 68, 0.2)",
    },
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const payload = isLoginView
      ? { username, password }
      : { username, email, password };
    const targetEndpoint = isLoginView ? "login" : "register";

    try {
      const response = await fetch(
        `https://expensetracker-production-c04c.up.railway.app/api/accounts/${targetEndpoint}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (isLoginView) {
          if (data.token) {
            setToken(data.token); // Synchronizes global parent state gateway
          } else {
            setErrorMessage(
              "Authentication successful but key signature not found.",
            );
          }
        } else {
          alert(
            "Account successfully created! Routing back to login tab screen.",
          );
          setIsLoginView(true);
          setErrorMessage("");
        }
      } else {
        setErrorMessage(
          data.error || data.username || "Invalid validation parameters.",
        );
      }
    } catch (err) {
      setErrorMessage(
        "Network conflict: Unable to cross-verify parameters with backend.",
      );
    }
  };

  return (
    <div style={styles.authContainer}>
      <h2
        style={{
          color: "#ffffff",
          marginBottom: "20px",
          fontWeight: "800",
          fontSize: "1.7rem",
        }}
      >
        Personal Expense Tracker 💰
      </h2>

      <div style={styles.cardWrapper}>
        <div style={styles.toggleFlex}>
          <button
            type="button"
            style={styles.toggleBtn(isLoginView)}
            onClick={() => {
              setIsLoginView(true);
              setErrorMessage("");
            }}
          >
            Login Screen
          </button>
          <button
            type="button"
            style={styles.toggleBtn(!isLoginView)}
            onClick={() => {
              setIsLoginView(false);
              setErrorMessage("");
            }}
          >
            New Account Register
          </button>
        </div>

        <h3
          style={{
            color: "#ffffff",
            marginTop: 0,
            marginBottom: "20px",
            fontSize: "1.25rem",
            fontWeight: "700",
          }}
        >
          {isLoginView ? "Sign In Section 🔑" : "Register Section 📝"}
        </h3>

        {errorMessage && <div style={styles.alertText}>{errorMessage}</div>}

        <form onSubmit={handleAuthSubmit}>
          <div>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              style={styles.inputBox}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {!isLoginView && (
            <div>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                style={styles.inputBox}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.inputBox}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn(!isLoginView)}>
            {isLoginView ? "Authenticate Login" : "Account Creation"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
