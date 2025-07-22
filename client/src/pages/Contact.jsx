import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-6">📞 Contact Me</h1>
        <div className="space-y-4 text-lg">
          <p>
            📧 Email: <a href="mailto:vishwakarmaaditya471@gmail.com" className="text-yellow-400">vishwakarmaaditya471@gmail.com</a>
          </p>
          <p>
            🐙 GitHub: <a href="https://github.com/Adii121" target="_blank" className="text-yellow-400">github.com/Adii121</a>
          </p>
          <p>
            💼 LinkedIn: <a href="www.linkedin.com/in/adityavishwakarma121" target="_blank" className="text-yellow-400">linkedin.com/in/adityavishwakarma121</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
