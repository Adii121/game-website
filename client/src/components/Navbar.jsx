export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-6 bg-indigo-900 text-white">
      <h1 className="text-2xl font-bold">🎮 Game Hub</h1>
      <nav className="space-x-6">
        <a href="/" className="hover:text-yellow-400">Home</a>
        <a href="/games" className="hover:text-yellow-400">Games</a>
        <a href="/contact" className="hover:text-yellow-400">Contact</a>
      </nav>
    </header>
  );
}
