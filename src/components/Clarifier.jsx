import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Clairifier = () => {
  const location = useLocation();
  const { sessionId, userIdea } = location.state || {};

  const [answers, setAnswers] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionId && userIdea) {
      console.log("Generating clarifying questions for:", userIdea, "in session:", sessionId);

      // Start clarifier session
      axios.post("https://astra-c8r4.onrender.com/api/clarifier/start", {
        sessionId,
        userIdea,
      })
      .then(res => console.log("Clarifier started:", res.data))
      .catch(err => console.error(err));
    }
  }, [sessionId, userIdea]);

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();

    if (!answers) {
      alert("Please enter your answers before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "https://astra-c8r4.onrender.com/api/clarifier/submit-answers",
        {
          sessionId,
          answers,
        }
      );
      console.log("Answers submitted:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers. Try again.");
    }
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-4">Clairifier</h1>
      <p><strong>Session ID:</strong> {sessionId}</p>
      <p><strong>User Idea:</strong> {userIdea}</p>

      {!submitted ? (
        <form onSubmit={handleSubmitAnswers} className="mt-6">
          <textarea
            className="w-full p-2 rounded text-black"
            rows={5}
            placeholder="Enter your answers here..."
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Submit Answers
          </button>
        </form>
      ) : (
        <p className="mt-4 text-green-400 font-bold">Answers submitted successfully!</p>
      )}
    </div>
  );
};

export default Clairifier;
