require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// ✅ Import and use routes
const transactionsRouter = require("./routes/transactions");
const authRouter = require("./routes/authRoutes"); // Import authentication routes

app.use("/api/transactions", transactionsRouter); // Enable transaction API
app.use("/api/auth", authRouter); // Enable authentication API

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
