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
      console.log("Generating clarifying questions for:", userIdea, "in session:", sessionId);

      setLoading(true);
      setFetchError("");

      axios.post("https://astra-c8r4.onrender.com/api/agents/clarifier/start", {
        sessionId,
        userIdea,
      })
      .then(res => {
        console.log("Clarifier started:", res.data);
        setQuestions(res.data.questions || []);
      })
      .catch(err => {
        console.error(err);
        setFetchError(err.response?.data?.error || "Failed to fetch questions");
      })
      .finally(() => setLoading(false));
    }
  }, [sessionId, userIdea]);

  const handleAnswerChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();

    if (Object.keys(answers).length === 0) {
      alert("Please answer the questions before submitting.");
      return;
    }

    // Convert answers object to array format expected by backend
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
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
    <div className="p-10 text-white">
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
        <form onSubmit={handleSubmitAnswers} className="mt-6 space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id || idx} className="flex flex-col">
              <label className="font-semibold mb-1">{q.text}</label>
              <textarea
                rows={3}
                className="w-full p-2 rounded text-black"
                placeholder="Your answer..."
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              />
            </div>
          ))}
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
