import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Clairifier = () => {
  const location = useLocation();
  const { sessionId, userIdea } = location.state || {};

  const [questions, setQuestions] = useState([]); // store questions
  const [answers, setAnswers] = useState({});     // store answers per question
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);   // loading state
  const [fetchError, setFetchError] = useState(""); // error state

  useEffect(() => {
    if (sessionId && userIdea) {
      setLoading(true);
      setFetchError("");

      axios.post("https://astra-c8r4.onrender.com/api/agents/clarifier/start", {
        sessionId,
        userIdea,
      })
      .then(res => {
        console.log("Clarifier started:", res.data);
        // res.data.questions is an array of strings
        setQuestions(res.data.questions || []);
      })
      .catch(err => {
        console.error(err);
        setFetchError(err.response?.data?.error || "Failed to fetch questions");
      })
      .finally(() => setLoading(false));
    }
  }, [sessionId, userIdea]);

  const handleAnswerChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();

    if (Object.keys(answers).length === 0) {
      alert("Please answer the questions before submitting.");
      return;
    }

    // ✅ Send backend the expected format with questionId
    const formattedAnswers = Object.entries(answers).map(([index, answer]) => ({
      questionId: parseInt(index),
      answer,
    }));

    try {
      const response = await axios.post(
        "https://astra-c8r4.onrender.com/api/agents/clarifier/submit-answers",
        {
          sessionId,
          answers: formattedAnswers,
        }
      );
      console.log("Answers submitted:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert(error.response?.data?.error || "Failed to submit answers. Try again.");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Clairifier</h1>
      <p><strong>Session ID:</strong> {sessionId}</p>
      <p><strong>User Idea:</strong> {userIdea}</p>

      {loading ? (
        <p className="mt-6 text-yellow-300 font-semibold">Loading questions...</p>
      ) : fetchError ? (
        <p className="mt-6 text-red-500 font-semibold">{fetchError}</p>
      ) : questions.length === 0 ? (
        <p className="mt-6 text-gray-300 font-semibold">No questions found.</p>
      ) : !submitted ? (
        <form onSubmit={handleSubmitAnswers} className="mt-6 space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="font-semibold mb-2 text-lg">{q}</label>
              <textarea
                rows={4}
                className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
                placeholder="Type your answer here..."
                value={answers[idx] || ""}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
              />
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 font-semibold"
          >
            Submit All Answers
          </button>
        </form>
      ) : (
        <p className="mt-6 text-green-400 font-bold text-xl">Answers submitted successfully!</p>
      )}
    </div>
  );
};

export default Clairifier;
