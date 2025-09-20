import React, { useState, useEffect, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import axios from "axios";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate

const Signup = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cardRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  const navigate = useNavigate(); // <-- initialize navigate

  useEffect(() => {
    // Animate card entrance
    gsap.from(cardRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" });

    // Floating blobs animation
    gsap.to(blob1Ref.current, {
      y: 20,
      x: 20,
      repeat: -1,
      yoyo: true,
      duration: 8,
      ease: "sine.inOut",
    });
    gsap.to(blob2Ref.current, {
      y: -20,
      x: -25,
      repeat: -1,
      yoyo: true,
      duration: 10,
      ease: "sine.inOut",
    });
  }, []);

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "https://astra-c8r4.onrender.com/api/users/register",
        { username: fullName, email, password },
        { withCredentials: true }
      );

      localStorage.setItem("userId", res.data.id);
      alert(`User created with ID: ${res.data.userId}`);

      // Redirect to /login after successful signup
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 overflow-hidden">
      {/* Floating blobs */}
      <div
        ref={blob1Ref}
        className="absolute w-80 h-80 bg-pink-500/40 rounded-full filter blur-3xl mix-blend-multiply top-20 left-20"
      ></div>
      <div
        ref={blob2Ref}
        className="absolute w-96 h-96 bg-yellow-400/30 rounded-full filter blur-3xl mix-blend-multiply bottom-20 right-20"
      ></div>

      {/* Capsule Navbar */}
      <nav className="absolute top-6 left-1/2 transform -translate-x-1/2 flex justify-between items-center bg-black/30 backdrop-blur-lg text-white px-8 py-3 rounded-full shadow-lg z-10 space-x-6">
        <div className="font-bold text-2xl tracking-widest">Astra</div>

        {/* Navbar links */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <a href="/login" className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
              Login
            </a>
          </li>
          <li>
            <a href="/signup" className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
              Signup
            </a>
          </li>
        </ul>

        {/* Capsule rainbow button */}
        <button className="hidden md:block px-5 py-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 text-white font-semibold shadow-lg transition-all duration-500 hover:from-purple-500 hover:via-pink-500 hover:to-yellow-400 hover:scale-105 transform">
          Get Started
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-3xl md:hidden focus:outline-none"
        >
          <FiMenu />
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <ul className="absolute top-16 left-1/2 transform -translate-x-1/2 flex flex-col bg-black/40 backdrop-blur-lg rounded-xl py-4 px-6 space-y-3 md:hidden z-20">
            <li>
              <a href="/login" className="hover:text-yellow-300 transition-colors">
                Login
              </a>
            </li>
            <li>
              <a href="/signup" className="hover:text-yellow-300 transition-colors">
                Signup
              </a>
            </li>
          </ul>
        )}
      </nav>

      {/* Signup Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md p-12 bg-white/40 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl flex flex-col items-center animate-fadeIn"
      >
        <h2 className="text-4xl font-extrabold mb-4 text-white text-center">Create Account</h2>
        <p className="text-white/90 mb-8 text-center">Enter your details to sign up</p>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-4 px-5 py-3 rounded-xl border border-white/50 bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:scale-[1.02]"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-5 py-3 rounded-xl border border-white/50 bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:scale-[1.02]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-5 py-3 rounded-xl border border-white/50 bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:scale-[1.02]"
        />

        <button
          onClick={handleSignup}
          className="w-full px-6 py-3 bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 text-white rounded-xl shadow-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:from-purple-500 hover:via-pink-500 hover:to-yellow-400"
        >
          Signup
        </button>

        <div className="mt-6 text-white/80 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-300 hover:underline">
            Login
          </a>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
