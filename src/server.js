const express = require("express");
const dotenv = require("dotenv");
const path = require("path");


dotenv.config({ path: path.resolve(__dirname, "../.env") });

// connect DB
const connectDB = require("./db/db");
connectDB();

const app = express();

// middlewares
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const protect = require("./middleware/authMiddleware");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// test protected route
app.get("/api/test", protect, (req, res) => {
    res.json({
        message: "Protected route working",
        user: req.user
    });
});

// default route
app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(5000, () => console.log("Server running on port 5000"));
