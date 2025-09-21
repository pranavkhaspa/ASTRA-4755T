import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";

const Session = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col">
      {/* 🌟 Floating Black Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] 
                   bg-black/80 backdrop-blur-lg rounded-2xl shadow-lg 
                   flex items-center justify-between px-6 py-4 z-50"
      >
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-white"
        >
          My App
        </motion.h1>

        {/* Hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md hover:bg-white/10"
        >
          <FiMenu className="text-2xl text-white" />
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-6 top-16 bg-black/90 text-white rounded-xl shadow-lg 
                         flex flex-col p-4 gap-2 w-40"
            >
              <motion.button
                whileHover={{ x: 5 }}
                className="px-4 py-2 rounded-lg hover:bg-white/10 text-left"
              >
                Dashboard
              </motion.button>
              <motion.button
                whileHover={{ x: 5 }}
                className="px-4 py-2 rounded-lg hover:bg-white/10 text-left"
              >
                Workspace
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* 🌟 Main Expanded Card */}
      <div className="flex flex-1 items-center justify-center mt-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
          whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
          className="bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 
                     rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-6 
                     w-[90%] md:w-[60%] lg:w-[40%] max-w-3xl"
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-purple-800"
          >
            Session
          </motion.h2>

          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            type="text"
            placeholder="Enter your idea here...."
            className="px-6 py-3 rounded-xl border-0 outline-none text-lg shadow-md 
                       focus:ring-2 focus:ring-purple-400 w-full transition"
          />

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r 
                       from-purple-600 to-pink-500 shadow-md hover:shadow-lg w-full"
          >
            Create Session
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Session;
