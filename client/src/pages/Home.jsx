import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data.slice(0, 3))) // show only first 3
      .catch((err) => console.error("Failed to fetch games:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4">
          Play Free Games Instantly
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          No downloads, no installs. Just click and play your favorite browser games.
        </p>
        {/* <Link
          to="/games"
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded-full transition"
        >
          🎮 Browse Games
        </Link> */}
      </section>

      {/* Featured Section */}
      <section className="px-6 py-12 bg-gray-800 rounded-t-3xl">
        <h2 className="text-3xl font-bold text-center mb-8">🔥 Featured Games</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {games.map((game) => (
            <div
              key={game._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={`http://localhost:5000${game.image}`}
                alt={game.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{game.description}</p>
                <a
                  href={`http://localhost:5000${game.play_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300"
                >
                  <Link
                    to={`/play/${game.play_url.split("/")[2]}`} // extracts folder name from /games/<folder>/index.html
                    className="block text-center bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300 transition"
                  >
                    ▶️ Play Now
                  </Link>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
