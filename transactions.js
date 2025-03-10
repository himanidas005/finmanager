const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// ✅ Define Transaction Schema
const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    date: { type: Date, default: Date.now }
});

// ✅ Create Transaction Model
const Transaction = mongoose.model("Transaction", transactionSchema);

// ✅ Route to Add a New Transaction
router.post("/", async (req, res) => {
    try {
        const { title, amount, type } = req.body;

        // Check if required fields are missing
        if (!title || !amount || !type) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newTransaction = new Transaction({ title, amount, type });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error("Error saving transaction:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Route to Get All Transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Route to Update a Transaction
router.put("/:id", async (req, res) => {
    try {
        const { title, amount, type } = req.body;

        // Check if required fields are missing
        if (!title || !amount || !type) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { title, amount, type },
            { new: true, runValidators: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.json(updatedTransaction);
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Route to Delete a Transaction
router.delete("/:id", async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!deletedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Export the Router
module.exports = router;
