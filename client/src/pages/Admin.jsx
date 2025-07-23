import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Admin() {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [gameFile, setGameFile] = useState(null);
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all games
  useEffect(() => {
    fetch(`${API_URL}/api/games`)
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Failed to fetch games:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile || !gameFile) {
      setMessage("❌ Please select both image and game ZIP file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("imageFile", imageFile);
    formData.append("gameFile", gameFile);

    try {
      const response = await fetch(`${API_URL}/api/games`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newGame = await response.json();
        setGames([...games, newGame]); // Add to list
        setMessage("✅ Game uploaded successfully!");
        setTitle("");
        setDescription("");
        setImageFile(null);
        setGameFile(null);
      } else {
        setMessage("❌ Failed to upload game.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error uploading game.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;

    try {
      const res = await fetch(`${API_URL}/api/games/${id}`, { method: "DELETE" });
      if (res.ok) {
        setGames(games.filter((g) => g._id !== id));
        setMessage("🗑 Game deleted successfully.");
      } else {
        setMessage("❌ Failed to delete game.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error deleting game.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <Navbar />
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">🔒 Admin Panel</h1>

        {/* Upload New Game */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-700 p-6 rounded-xl mx-auto mb-10 space-y-4"
          encType="multipart/form-data"
        >
          <h2 className="text-xl font-bold mb-2">📤 Upload New Game</h2>

          <div>
            <label className="block font-bold mb-1">🎮 Game Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">📝 Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">🖼 Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">📦 Upload Game ZIP</label>
            <input
              type="file"
              accept=".zip"
              onChange={(e) => setGameFile(e.target.files[0])}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition"
          >
            🚀 Upload Game
          </button>
        </form>

        {/* Existing Games */}
        <h2 className="text-2xl font-bold mb-4">📂 Your Uploaded Games</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {games.map((game) => (
            <div
              key={game._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={`${API_URL}${game.image}`}
                alt={game.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{game.description}</p>
                <div className="flex justify-between space-x-2">
                  <a
                    href={`${API_URL}${game.play_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-yellow-400 text-black font-bold py-1 px-2 rounded hover:bg-yellow-300 text-center"
                  >
                    ▶️ Play
                  </a>
                  <button
                    onClick={() => handleDelete(game._id)}
                    className="flex-1 bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-400"
                  >
                    🗑 Delete
                  </button>
                  {/* Update button placeholder */}
                  <button
                    onClick={() => handleUpdate(game._id)}
                    className="flex-1 bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-400"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {message && (
          <p className="mt-6 text-center font-bold">{message}</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
