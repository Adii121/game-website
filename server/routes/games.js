const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const unzipper = require("unzipper");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "gameFile") {
      cb(null, path.join(__dirname, "../games")); // Save ZIPs in /games
    } else if (file.fieldname === "imageFile") {
      cb(null, path.join(__dirname, "../public/images")); // Save images in /public/images
    }
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${timestamp}-${baseName}${ext}`);
  },
});

const upload = multer({ storage });

/**
 * Utility: Flatten extracted folder if ZIP contains single top-level folder
 */
function flattenFolder(extractPath) {
  const extractedFiles = fs.readdirSync(extractPath);
  if (
    extractedFiles.length === 1 &&
    fs.lstatSync(path.join(extractPath, extractedFiles[0])).isDirectory()
  ) {
    const innerFolder = path.join(extractPath, extractedFiles[0]);
    const innerFiles = fs.readdirSync(innerFolder);

    innerFiles.forEach((file) => {
      fs.renameSync(
        path.join(innerFolder, file),
        path.join(extractPath, file)
      );
    });

    fs.rmdirSync(innerFolder);
  }
}

// GET all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    console.error("GET /api/games error:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET single game
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    console.error("GET /api/games/:id error:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST: Upload new game
router.post(
  "/",
  upload.fields([
    { name: "gameFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, description } = req.body;

      // Handle image
      const imageFile = req.files["imageFile"][0];
      const imageUrl = `/images/${imageFile.filename}`;

      // Handle ZIP extraction
      const gameFile = req.files["gameFile"][0];
      const zipPath = gameFile.path;
      const folderName = gameFile.filename.replace(".zip", "");
      const extractPath = path.join(__dirname, "../games", folderName);

      fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: extractPath }))
        .on("close", async () => {
          fs.unlinkSync(zipPath); // Delete ZIP after extraction

          // Flatten folder if needed
          flattenFolder(extractPath);

          const play_url = `/games/${folderName}/index.html`;

          const newGame = new Game({
            title,
            description,
            image: imageUrl,
            play_url,
          });

          await newGame.save();
          res.status(201).json(newGame);
        });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
);

// PATCH: Update game
router.patch(
  "/:id",
  upload.fields([
    { name: "gameFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }

      // Update metadata
      if (req.body.title) game.title = req.body.title;
      if (req.body.description) game.description = req.body.description;

      // Update image if uploaded
      if (req.files["imageFile"]) {
        const imageFile = req.files["imageFile"][0];
        game.image = `/images/${imageFile.filename}`;
      }

      // Update game files if ZIP uploaded
      if (req.files["gameFile"]) {
        const zipPath = req.files["gameFile"][0].path;
        const folderName = req.files["gameFile"][0].filename.replace(".zip", "");
        const extractPath = path.join(__dirname, "../games", folderName);

        // Delete old game folder
        const oldFolderPath = path.join(
          __dirname,
          "../games",
          game.play_url.split("/")[2]
        );
        if (fs.existsSync(oldFolderPath)) {
          fs.rmSync(oldFolderPath, { recursive: true, force: true });
        }

        // Extract new ZIP
        fs.createReadStream(zipPath)
          .pipe(unzipper.Extract({ path: extractPath }))
          .on("close", () => {
            fs.unlinkSync(zipPath); // Delete ZIP after extraction

            // Flatten folder if needed
            flattenFolder(extractPath);
          });

        game.play_url = `/games/${folderName}/index.html`;
      }

      const updatedGame = await game.save();
      res.json(updatedGame);
    } catch (err) {
      console.error("PATCH /api/games/:id error:", err);
      res.status(400).json({ message: err.message });
    }
  }
);

// DELETE: Remove game
router.delete("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Delete game folder
    const gameFolderPath = path.join(
      __dirname,
      "../games",
      game.play_url.split("/")[2]
    );
    if (fs.existsSync(gameFolderPath)) {
      fs.rmSync(gameFolderPath, { recursive: true, force: true });
    }

    // Delete image
    const imageFilePath = path.join(__dirname, "../public", game.image);
    if (fs.existsSync(imageFilePath)) {
      fs.unlinkSync(imageFilePath);
    }

    await game.deleteOne();
    res.json({ message: "Game deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/games/:id error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
