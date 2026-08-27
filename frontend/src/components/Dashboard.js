import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard({ token, handleLogout }) {
  // State variables for core data management
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  // User perspective functional upgrades state variables
  const [budget, setBudget] = useState(5000); // Default monthly budget set to 5000 INR
  const [selectedFilter, setSelectedFilter] = useState("All"); // Analytical category filter hook

  // Authentication header configuration setup
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  // Pulls transactional datasets from Django API backend server repository
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://expensetracker-production-c04c.up.railway.app/api/expenses/",
        config,
      );
      setExpenses(response.data);
    } catch (err) {
      console.error(
        "Failed to fetch historical expense data matrix from the API cluster.",
      );
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Event handler adding new transactional element to backend engine
  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://expensetracker-production-c04c.up.railway.app/api/expenses/",
        { title, amount: parseFloat(amount), category },
        config,
      );
      setTitle("");
      setAmount("");
      fetchExpenses(); // Refreshes client-side representation layer instantly
    } catch (err) {
      alert(
        "Error: Unable to store target expense transaction inside system logs.",
      );
    }
  };

  // Erasing capability workflow handling physical deletion from database architecture
  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(
        `https://expensetracker-production-c04c.up.railway.app/api/expenses/${id}/`,
        config,
      );
      fetchExpenses(); // Recomputes structural values on database feedback signal
    } catch (err) {
      alert(
        "Error: Critical failure executing data termination routing on backend.",
      );
    }
  };

  // Dynamic analytic filtering logic configuration
  const filteredExpenses = expenses.filter((item) =>
    selectedFilter === "All"
      ? true
      : item.category.toLowerCase() === selectedFilter.toLowerCase(),
  );

  // Computes active aggregated summary parameters dynamically
  const totalAmount = expenses.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0,
  );
  const filteredSubTotal = filteredExpenses.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0,
  );

  // Financial threshold parameters calculations evaluating budget breach metrics
  const budgetThresholdBreached = totalAmount >= parseFloat(budget || 0) * 0.8;

  // Ultra Contrast Styling Layout Map containing requested light black canvas tweaks
  const styles = {
    bgWrapper: {
      backgroundColor: "#111827", // Rich light black/charcoal background mesh optimizing readability
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    },
    vectorBlob1: {
      position: "absolute",
      width: "550px",
      height: "550px",
      background:
        "radial-gradient(circle, rgba(55,65,81,0.5) 0%, rgba(17,24,39,0) 70%)", // Light black slate geometric node
      top: "-150px",
      left: "-100px",
      zIndex: 0,
    },
    vectorBlob2: {
      position: "absolute",
      width: "650px",
      height: "650px",
      background:
        "radial-gradient(circle, rgba(31,41,55,0.6) 0%, rgba(17,24,39,0) 70%)", // High-contrast structural overlay
      bottom: "-200px",
      right: "-100px",
      zIndex: 0,
    },
    container: {
      maxWidth: "1050px",
      margin: "0 auto",
      backgroundColor: "rgba(24, 31, 46, 0.95)", // High contrast card wrapper keeping layouts visible
      borderRadius: "32px",
      padding: "35px",
      boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7)",
      position: "relative",
      zIndex: 1,
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
    },
    headerFlex: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      paddingBottom: "20px",
    },
    mockupSectionGrid: {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: "35px",
      marginBottom: "35px",
    },
    phoneMockupLeft: {
      backgroundColor: "#1f293d", // Dark luxury UI component container blocks
      borderRadius: "24px",
      padding: "25px",
      border: "2px solid #3b82f6",
      boxShadow: "0 15px 35px rgba(59, 130, 246, 0.05)",
    },
    // Dynamic Spending box layout auto-shifting theme metrics when budget warnings trip
    phoneMockupRight: {
      backgroundColor: budgetThresholdBreached ? "#451a1a" : "#142c26", // Shifts to soft warning red block when threshold breaks
      borderRadius: "24px",
      padding: "25px",
      border: budgetThresholdBreached
        ? "2px solid #ef4444"
        : "2px solid #10b981",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      transition: "all 0.4s ease",
    },
    formInputBox: {
      width: "100%",
      padding: "12px 14px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "14px",
      backgroundColor: "#182235",
      boxSizing: "border-box",
      fontSize: "0.95rem",
      marginBottom: "12px",
      color: "#ffffff",
    },
    btnSubmitTransfer: {
      width: "100%",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      padding: "14px",
      border: "none",
      borderRadius: "14px",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: "pointer",
      boxShadow: "0 6px 20px rgba(59, 130, 246, 0.25)",
    },
    historyPanelCard: {
      backgroundColor: "#1f293d",
      borderRadius: "24px",
      padding: "25px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      border: "1px solid rgba(255, 255, 255, 0.03)",
    },
  };

  return (
    <div style={styles.bgWrapper}>
      <div style={styles.vectorBlob1}></div>
      <div style={styles.vectorBlob2}></div>

      <div style={styles.container}>
        {/* Top Header Application Interface Control Panel */}
        <div style={styles.headerFlex}>
          <div>
            <h1
              style={{
                color: "#ffffff",
                margin: 0,
                fontSize: "2.2rem",
                fontWeight: "800",
              }}
            >
              FinTech Tracker Premium 💸
            </h1>
            <p
              style={{
                margin: "4px 0 0 0",
                color: "#94a3b8",
                fontSize: "0.95rem",
              }}
            >
              Advanced Microfinance Operational Matrix Terminal
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
            }}
          >
            Sign Out 🏃‍♂️
          </button>
        </div>

        {/* Dual Component Simulation Mockup Engine Grid */}
        <div style={styles.mockupSectionGrid}>
          {/* Left Smartphone Grid Terminal: Input Fields + Target Budget Configurations */}
          <div style={styles.phoneMockupLeft}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  color: "#3b82f6",
                  backgroundColor: "rgba(59,130,246,0.15)",
                  padding: "4px 12px",
                  borderRadius: "20px",
                }}
              >
                TRANSACTION MANAGEMENT ENGINE
              </span>
            </div>

            {/* User Upgrade Implementation Control Item: Set Monthly Target Budget Fields */}
            <div
              style={{
                marginBottom: "15px",
                paddingBottom: "15px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  fontWeight: "600",
                }}
              >
                🎯 Set Monthly Budget Target (INR)
              </label>
              <input
                type="number"
                style={styles.formInputBox}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 5000"
              />
            </div>

            <form onSubmit={handleAddExpense}>
              <div style={{ marginBottom: "10px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "0.85rem",
                    color: "#94a3b8",
                    fontWeight: "600",
                  }}
                >
                  Transaction Title
                </label>
                <input
                  type="text"
                  style={styles.formInputBox}
                  placeholder="e.g., Dinner, Fuel, Server Cost"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "0.85rem",
                    color: "#94a3b8",
                    fontWeight: "600",
                  }}
                >
                  Amount Input value
                </label>
                <input
                  type="number"
                  style={styles.formInputBox}
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "0.85rem",
                    color: "#94a3b8",
                    fontWeight: "600",
                  }}
                >
                  Category Cluster Assignment
                </label>
                <select
                  style={styles.formInputBox}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Food">Food 🍔</option>
                  <option value="Travel">Travel 🚗</option>
                  <option value="Shopping">Shopping 🛍️</option>
                  <option value="Bills">Bills 📄</option>
                </select>
              </div>

              <button type="submit" style={styles.btnSubmitTransfer}>
                EXECUTE TRANSACTION RECORD ⚡
              </button>
            </form>
          </div>

          {/* Right Smartphone Screen Model: Tracks Accumulated Data Balances + Budget Breaching Indicator */}
          <div style={styles.phoneMockupRight}>
            <div
              style={{
                width: "65px",
                height: "65px",
                backgroundColor: budgetThresholdBreached
                  ? "#ef4444"
                  : "#10b981",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "15px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
              }}
            >
              {budgetThresholdBreached ? "⚠️" : "✓"}
            </div>

            <h3
              style={{
                margin: "5px 0 0 0",
                color: "#e2e8f0",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              Total Verified Outflux
            </h3>

            <span
              style={{
                fontSize: "3.2rem",
                fontWeight: "800",
                color: budgetThresholdBreached ? "#fca5a5" : "#34d399",
                display: "block",
                margin: "5px 0",
              }}
            >
              ₹{totalAmount.toFixed(2)}
            </span>

            {/* Financial logic warning notification text rendering block */}
            {budgetThresholdBreached && (
              <p
                style={{
                  color: "#fca5a5",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  backgroundColor: "rgba(239,68,68,0.2)",
                  padding: "6px 14px",
                  borderRadius: "30px",
                  margin: "10px 0 0 0",
                }}
              >
                Warning: Breached 80% of allocation limits!
              </p>
            )}

            <p
              style={{
                margin: "15px 0 0 0",
                fontSize: "0.8rem",
                color: "#94a3b8",
                maxWidth: "240px",
              }}
            >
              Allocated Budget Limit:{" "}
              <strong style={{ color: "#ffffff" }}>
                ₹{parseFloat(budget || 0).toFixed(2)}
              </strong>
            </p>
          </div>
        </div>

        {/* Transaction History Workspace Card Panel Containing Multi-Category Filtering Filters */}
        <div style={styles.historyPanelCard}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              paddingBottom: "15px",
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: "1.25rem",
                  fontWeight: "700",
                }}
              >
                Real-time Transactional Settlement Ledger Logs
              </h3>
              {selectedFilter !== "All" && (
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#34d399",
                    fontWeight: "500",
                  }}
                >
                  Selected Cluster Subtotal: ₹{filteredSubTotal.toFixed(2)}
                </span>
              )}
            </div>

            {/* Analytical Sorting Interface Dropdown Control Input Node */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  fontWeight: "500",
                }}
              >
                Filter Segment:
              </span>
              <select
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#141b29",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                }}
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="All">All Categories 📋</option>
                <option value="Food">Food 🍔</option>
                <option value="Travel">Travel 🚗</option>
                <option value="Shopping">Shopping 🛍️</option>
                <option value="Bills">Bills 📄</option>
              </select>
            </div>
          </div>

          {filteredExpenses.length === 0 ? (
            <p
              style={{ textAlign: "center", color: "#64748b", padding: "20px" }}
            >
              No transactional parameters found mapping inside current segment
              lookup.
            </p>
          ) : (
            filteredExpenses.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 10px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      margin: "0 0 4px 0",
                      color: "#f8fafc",
                      fontWeight: "600",
                      fontSize: "1rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {item.date || "Processed Today"}
                  </span>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "25px" }}
                >
                  <span
                    style={{
                      background: "rgba(52,211,153,0.1)",
                      color: "#34d399",
                      padding: "6px 14px",
                      borderRadius: "30px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    style={{
                      color: "#34d399",
                      fontWeight: "700",
                      fontSize: "1.15rem",
                      minWidth: "90px",
                      textAlign: "right",
                    }}
                  >
                    + ₹{parseFloat(item.amount).toFixed(2)}
                  </span>

                  {/* User Perspective Erasing Control Ability Action Toggle Key Button Element */}
                  <button
                    onClick={() => handleDeleteExpense(item.id)}
                    style={{
                      backgroundColor: "transparent",
                      color: "#f87171",
                      border: "1px solid rgba(248,113,113,0.3)",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "rgba(248,113,113,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    Delete 🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
