const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' })); // Large JSON payloads
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*', // Or specify your frontend URL for stricter CORS
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

// Sanitize input against NoSQL query injection
app.use((req, res, next) => {
  req.body = mongoSanitize.sanitize(req.body);
  // req.query and req.params are immutable in Express 5
  req.sanitizedQuery = mongoSanitize.sanitize(req.query); // store sanitized copy
  req.sanitizedParams = mongoSanitize.sanitize(req.params); // store sanitized copy
  next();
});

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images'), { dotfiles: 'deny' }));
app.use('/games', express.static(path.join(__dirname, 'games'), { dotfiles: 'deny' }));

// Routes
app.get("/", (req, res) => {
  res.send("Backend API is running!");
});
const gameRoutes = require("./routes/games");
app.use("/api/games", gameRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  // No need for useNewUrlParser or useUnifiedTopology in Mongoose >= 6
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
