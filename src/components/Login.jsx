import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import axios from "axios";

const Login = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backgroundGifUrl =
    "https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif"; // example scenery GIF

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://astra-c8r4.onrender.com/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      alert(res.data.message || "Login successful");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundGifUrl})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Pulsing circles */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-yellow-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>

      {/* Capsule navbar centered */}
      <nav className="absolute top-10 left-1/2 transform -translate-x-1/2 flex justify-between items-center bg-brown-700/90 text-white px-8 py-3 rounded-full shadow-lg z-10">
        <div className="font-bold text-xl tracking-widest">Astra</div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-3xl md:hidden focus:outline-none"
        >
          <FiMenu />
        </button>

        <ul
          className={`md:flex md:items-center md:space-x-8 absolute md:static bg-brown-700/90 w-full left-0 md:w-auto md:bg-transparent transition-all duration-300 ${
            menuOpen ? "top-16 block" : "top-[-200px] hidden"
          }`}
        >
          <li>
            <a className="block py-2 px-6 hover:text-yellow-300 transition-colors" href="#">
              Login
            </a>
          </li>
          <li>
            <a className="block py-2 px-6 hover:text-yellow-300 transition-colors" href="#">
              Signup
            </a>
          </li>
        </ul>
      </nav>

      {/* Login card */}
      <div className="relative z-10 flex justify-center items-center pt-32 px-4">
        <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all"
          />

          <button
            onClick={handleLogin}
            className="w-full px-6 py-3 bg-yellow-800 hover:bg-yellow-900 text-white rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
          >
            Login
          </button>
        </div>
      </div>

      {/* Pulsing animation */}
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

export default Login;
