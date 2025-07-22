export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg mt-4">Page not found.</p>
      <a href="/" className="mt-6 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition">
        Go Home
      </a>
    </div>
  );
}
