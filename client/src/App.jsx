import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Game";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import PlayGame from "./pages/PlayGame";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/play/:folder" element={<PlayGame />} />
        {/* fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
