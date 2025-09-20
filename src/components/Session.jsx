import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import axios from "axios";

const Session = ({ userId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [idea, setIdea] = useState("");

  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1581092338117-927d4b06ee5b?auto=format&fit=crop&w=1470&q=80";

  const handleCreateSession = async () => {
    if (!idea || !userId) {
      alert("Please enter an idea and ensure userId is available.");
      return;
    }

    try {
      const res = await axios.post(
        "https://astra-c8r4.onrender.com/api/session/start",
        {
          userIdea: idea,
          userId: userId,
        }
      );
      alert(`Session created with ID: ${res.data.sessionId}`);
      setIdea(""); // optional: clear input after creation
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.error || "Failed to create session");
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>

      {/* Navbar */}
      <nav className="bg-black/80 text-white px-6 py-4 flex justify-between items-center relative z-10 shadow-lg">
        <div className="bg-black/90 px-5 py-2 rounded-full border border-white/20 shadow-md">
          <h1 className="text-xl font-bold tracking-widest">Astra</h1>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-3xl md:hidden focus:outline-none"
        >
          <FiMenu />
        </button>

        <ul
          className={`md:flex md:items-center md:space-x-8 absolute md:static bg-black/80 w-full left-0 md:w-auto md:bg-transparent transition-all duration-300 ${
            menuOpen ? "top-16 block" : "top-[-200px] hidden"
          }`}
        >
          <li>
            <a
              className="block py-2 px-6 hover:text-purple-400 transition-colors"
              href="#"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              className="block py-2 px-6 hover:text-purple-400 transition-colors"
              href="#"
            >
              Workspace
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-center pt-20 px-4">
        <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-lg w-full">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            Welcome to the Session
          </h2>

          <input
            type="text"
            placeholder="Enter an idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full mb-6 px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />

          <div className="flex justify-center gap-6">
            <button
              onClick={handleCreateSession}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
            >
              Create Session
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          .animate-pulse-slow {
            animation: pulse 6s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default Session;
