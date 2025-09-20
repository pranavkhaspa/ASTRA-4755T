import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import axios from "axios";

const Signup = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backgroundImageUrl = "https://images.unsplash.com/photo-1581092338117-927d4b06ee5b?auto=format&fit=crop&w=1470&q=80";

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "https://astra-c8r4.onrender.com/api/users/register",
        { username: fullName, email, password },
         { withCredentials: true }
      );
      alert(`User created with ID: ${res.data.id}`);
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>

      <nav className="bg-black/80 text-white px-6 py-4 flex justify-between items-center relative z-10 shadow-lg">
        <div className="bg-black/90 px-5 py-2 rounded-full border border-white/20 shadow-md">
          <h1 className="text-xl font-bold tracking-widest">Astra</h1>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl md:hidden focus:outline-none">
          <FiMenu />
        </button>

        <ul
          className={`md:flex md:items-center md:space-x-8 absolute md:static bg-black/80 w-full left-0 md:w-auto md:bg-transparent transition-all duration-300 ${
            menuOpen ? "top-16 block" : "top-[-200px] hidden"
          }`}
        >
          <li>
            <a className="block py-2 px-6 hover:text-purple-400 transition-colors" href="#">
              Login
            </a>
          </li>
          <li>
            <a className="block py-2 px-6 hover:text-purple-400 transition-colors" href="#">
              Signup
            </a>
          </li>
        </ul>
      </nav>

      <div className="relative z-10 flex justify-center items-center pt-20 px-4">
        <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Signup</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mb-4 px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />

          <button
            onClick={handleSignup}
            className="w-full px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
          >
            Signup
          </button>
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

export default Signup;
