import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PlayGame() {
  const { folder } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-grow flex justify-center items-center p-4">
        <div className="w-full max-w-5xl aspect-video border-4 border-yellow-400 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={`${API_URL}/games/${folder}/index.html`}
            title="Play Game"
            width="100%"
            height="100%"
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </main>

      <Footer />
    </div>
  );
}
