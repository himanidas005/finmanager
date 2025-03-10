const express = require("express");
const Expense = require("../models/Expense"); // Ensure correct path

const router = express.Router();

// ✅ Create a new expense
router.post("/", async (req, res) => {
    try {
        const { title, amount, date } = req.body;
        const newExpense = new Expense({ title, amount, date });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: "Error saving expense" });
    }
});

// ✅ Get all expenses
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: "Error fetching expenses" });
    }
});

// ✅ Get a single expense by ID
router.get("/:id", async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: "Error fetching expense" });
    }
});

// ✅ Update an expense by ID
router.put("/:id", async (req, res) => {
    try {
        const { title, amount, date } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { title, amount, date },
            { new: true, runValidators: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: "Error updating expense" });
    }
});

// ✅ Delete an expense by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting expense" });
    }
});

module.exports = router;
