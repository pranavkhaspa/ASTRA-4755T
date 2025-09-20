import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Session = () => {
  const [idea, setIdea] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

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

      // Save to localStorage (optional persistence)
      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("userIdea", idea);

      alert(`Session created with ID: ${sessionId}`);
      setIdea("");

      // Pass sessionId and idea to Clairifier
      navigate("/clairifier", { state: { sessionId, userIdea: idea } });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create session");
    }
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold mb-4">Start a Session</h1>
      <textarea
        placeholder="Enter your idea here..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className="w-full h-24 p-3 rounded text-black"
      />
      <button
        onClick={handleCreateSession}
        className="mt-4 bg-green-500 px-4 py-2 rounded"
      >
        Create Session
      </button>
    </div>
  );
};

export default Session;
