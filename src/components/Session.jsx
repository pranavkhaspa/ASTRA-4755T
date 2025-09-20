import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Session = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [idea, setIdea] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Get userId from navigation state or fallback localStorage
  const userId = location.state?.userId || localStorage.getItem("userId");

  const handleCreateSession = async () => {
    if (!idea || !userId) {
      alert("Please enter an idea and ensure userId is available.");
      return;
    }

    try {
      const res = await axios.post(
        "https://astra-c8r4.onrender.com/api/session/start",
        { userIdea: idea, userId },
        { withCredentials: true }
      );

      const sessionId = res.data.sessionId;

      // Save to localStorage for persistence
      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("userIdea", idea);

      alert(`Session created with ID: ${sessionId}`);
      setIdea("");

      // Navigate to Clairifier with sessionId and userIdea
      navigate("/clarifier", { state: { sessionId, userIdea: idea } });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create session");
    }
  };

  const ArrowIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white w-6 h-6"
    >
      <path
        d="M12 5L12 19M12 5L6 11M12 5L18 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const MenuIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 overflow-hidden">
      {/* Floating Blobs */}
      <div className="absolute w-80 h-80 bg-pink-500/40 rounded-full filter blur-3xl mix-blend-multiply top-20 left-20 animate-blob1"></div>
      <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full filter blur-3xl mix-blend-multiply bottom-20 right-20 animate-blob2"></div>

      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[28vw] md:text-[20rem] font-black text-white/5 tracking-tighter leading-none select-none animate-bg-text">
          ASTRA
        </h1>
      </div>

      {/* Navbar */}
      <nav className="absolute top-6 left-1/2 transform -translate-x-1/2 flex justify-between items-center bg-black/30 backdrop-blur-lg text-white px-10 py-3 rounded-full shadow-lg z-10 w-[90%] max-w-6xl space-x-6">
        <div className="font-bold text-2xl tracking-widest">ASTRA</div>

        <ul className="hidden md:flex space-x-8 items-center relative text-sm font-medium tracking-wider">
          <li>
            <a href="#" className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
              DASHBOARD
            </a>
          </li>
          <li className="relative group">
            <button className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
              WORKSPACE
            </button>
            <ul className="absolute top-full left-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 z-20">
              <li>
                <a href="#" className="block px-4 py-2 text-white hover:bg-white/20 transition-colors rounded-t-xl">
                  Project Alpha
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-white hover:bg-white/20 transition-colors">
                  Project Beta
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-white hover:bg-white/20 transition-colors rounded-b-xl">
                  Project Gamma
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <button className="hidden md:block px-6 py-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 text-white font-semibold shadow-lg transition-all duration-500 hover:from-purple-500 hover:via-pink-500 hover:to-yellow-400 hover:scale-105 transform">
          Get Started
        </button>

        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl md:hidden focus:outline-none z-30">
          <MenuIcon />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-1/2 transform -translate-x-1/2 flex flex-col bg-black/40 backdrop-blur-lg rounded-xl py-4 px-6 space-y-3 z-20">
          <ul className="flex flex-col text-center space-y-3 text-xl">
            <li>
              <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 transition-colors">
                DASHBOARD
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 transition-colors">
                WORKSPACE
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-2xl px-4 animate-content-fade-in">
        <div className="relative w-full">
          <div className="relative bg-white/30 border border-white/30 rounded-3xl shadow-2xl backdrop-blur-2xl">
            <textarea
              placeholder="What do you want to know?"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCreateSession()}
              className="w-full h-24 p-6 bg-transparent text-lg text-white placeholder-white/80 focus:outline-none rounded-2xl resize-none"
            />
            <button
              onClick={handleCreateSession}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:from-purple-500 hover:via-pink-500 hover:to-yellow-400 hover:scale-105"
              aria-label="Create Session"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-content-fade-in { animation: contentFadeIn 1s ease-out 0.5s forwards; }

        @keyframes blob1Animation {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 20px) scale(1.1); }
        }
        .animate-blob1 { animation: blob1Animation 8s ease-in-out infinite; }

        @keyframes blob2Animation {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, -20px) scale(1.1); }
        }
        .animate-blob2 { animation: blob2Animation 10s ease-in-out infinite; }

        @keyframes bgTextFadeIn {
          from { opacity: 0; transform: scale(1.2); }
          to { opacity: 0.05; transform: scale(1); }
        }
        .animate-bg-text { animation: bgTextFadeIn 2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Session;
