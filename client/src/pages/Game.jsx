import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Game() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/games`)
      .then((res) => res.json())
      .then((data) => setGames(data.slice(0, 3))) // show only first 3
      .catch((err) => console.error("Failed to fetch games:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10">🎮 All Games</h1>

        
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {games.map((game) => (
            <div
              key={game._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={`${process.env.REACT_APP_API_URL}${game.image}`}
                alt={game.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{game.description}</p>
                <a
                  href={`${process.env.REACT_APP_API_URL}${game.play_url}`}
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
      </main>
      <Footer />
    </div>
  );
}
