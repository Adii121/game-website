const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  play_url: String, // New field for URL to iframe game
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Game", gameSchema);
