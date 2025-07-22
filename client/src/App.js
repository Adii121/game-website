import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-sm shadow-md">
        <h1 className="text-3xl font-bold text-indigo-400">🎮 GameHub</h1>
        <ul className="flex gap-6 text-gray-300 font-medium">
          <li className="hover:text-indigo-400 cursor-pointer transition">Home</li>
          <li className="hover:text-indigo-400 cursor-pointer transition">Games</li>
          <li className="hover:text-indigo-400 cursor-pointer transition">About</li>
          <li className="hover:text-indigo-400 cursor-pointer transition">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24">
        <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
          Welcome to <span className="text-indigo-400">GameHub</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8">
          Explore, play, and create amazing indie games. Your journey into
          gaming starts here!
        </p>
        <button className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-full font-semibold transition duration-300">
          Get Started
        </button>
      </section>

      {/* Game Showcase */}
      <section className="px-8 py-16">
        <h3 className="text-4xl font-bold text-center mb-12">
          Featured Games
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((game) => (
            <div
              key={game}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition"
            >
              <img
                src={`https://source.unsplash.com/600x400/?game,${game}`}
                alt={`Game ${game}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">
                  Game Title {game}
                </h4>
                <p className="text-gray-400">
                  A short description of this amazing game.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
