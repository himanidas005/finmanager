import React, { useState, useEffect } from "react";

function Expenses() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (expenseName.trim() !== "" && amount.trim() !== "") {
      const newExpense = { id: Date.now(), name: expenseName, amount };
      setExpenses([...expenses, newExpense]);
      setExpenseName("");
      setAmount("");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh", 
      width: "100vw", 
      textAlign: "center",
      background: "#1e1e1e", 
      color: "white" 
    }}>
      <div style={{ 
        background: "#2c2f33", 
        padding: "30px", 
        borderRadius: "10px", 
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
        minWidth: "400px", 
        maxWidth: "600px",
        textAlign: "center" 
      }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Finance Manager</h2>
        
        {/* Input Fields */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
          <input 
            type="text" 
            placeholder="Expense Name" 
            value={expenseName} 
            onChange={(e) => setExpenseName(e.target.value)} 
            style={{ padding: "10px", flex: 1, fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }} 
          />
          <input 
            type="text" 
            placeholder="Amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            style={{ padding: "10px", flex: 1, fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }} 
          />
          <button 
            onClick={addExpense} 
            style={{ padding: "10px 15px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", fontSize: "1rem", cursor: "pointer" }}
          >Add Expense</button>
        </div>

        {/* Expense List */}
        <h3 style={{ marginBottom: "10px" }}>Expense List</h3>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "1.2rem" }}>
          {expenses.map((expense) => (
            <li key={expense.id} style={{ margin: "5px 0", padding: "10px", background: "#3a3f44", borderRadius: "5px" }}>
              {expense.name}: ${expense.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Expenses;
