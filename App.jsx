import React, { useEffect, useState } from "react";
import { addTransaction, getTransaction, updateTransaction, deleteTransaction } from "./api/transactionApi.js";
import "./App.css"; // ✅ Import CSS file

function App() {
    const [transactions, setTransactions] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [editId, setEditId] = useState(null);

    // ✅ Fetch all transactions when the app loads
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getTransaction();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }
        fetchData();
    }, []);

    // ✅ Handle adding or updating a transaction
    const handleSaveTransaction = async () => {
        const transactionData = { title, amount: Number(amount), type };

        try {
            if (editId) {
                await updateTransaction(editId, transactionData);
                setEditId(null); // Reset edit mode
            } else {
                await addTransaction(transactionData);
            }

            // Refresh transactions after saving
            setTransactions(await getTransaction());

            // Reset input fields
            setTitle("");
            setAmount("");
            setType("expense");
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    // ✅ Handle deleting a transaction
    const handleDelete = async (id) => {
        try {
            await deleteTransaction(id);
            setTransactions(await getTransaction()); // Refresh list
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    // ✅ Handle setting transaction for editing
    const handleEdit = (transaction) => {
        setEditId(transaction._id);
        setTitle(transaction.title);
        setAmount(transaction.amount);
        setType(transaction.type);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">💰 Transaction Tracker</h1>

            {/* ✅ Input Form */}
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input-field"
                />
                <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button onClick={handleSaveTransaction} className="add-btn">
                    {editId ? "Update Transaction" : "Add Transaction"}
                </button>
            </div>

            {/* ✅ Transactions List */}
            <ul className="transactions-list">
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <li key={transaction._id} className="transaction-item">
                            <span className="transaction-text">
                                {transaction.title} - ₹{transaction.amount} ({transaction.type})
                            </span>
                            <div className="buttons">
                                <button onClick={() => handleEdit(transaction)} className="edit-btn">✏️ Edit</button>
                                <button onClick={() => handleDelete(transaction._id)} className="delete-btn">❌ Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="no-transactions">No transactions found.</p>
                )}
            </ul>
        </div>
    );
}

export default App;
