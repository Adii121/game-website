const express = require("express");
const router = express.Router();
const Game = require("../models/game");

// GET all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new game
router.post("/", async (req, res) => {
  const game = new Game({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  });
  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH: Update specific fields of a game
router.patch("/:id", async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // only update provided fields
      { new: true }       // return the updated document
    );

    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(updatedGame);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE a game
router.delete("/:id", async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    res.json({ message: "Game deleted", deletedGame });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
