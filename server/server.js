const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json({ limit: '50mb' })); // Prevent large payload attacks

app.use('/images', express.static(path.join(__dirname, 'public/images'), { dotfiles: 'deny' }));

app.use('/games', express.static(path.join(__dirname, 'games'), { dotfiles: 'deny' }));

app.use(mongoSanitize());

// Test route
app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

// Import routes
const gameRoutes = require("./routes/games");
app.use("/api/games", gameRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
