import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Clairifier = () => {
  const location = useLocation();
  const { sessionId } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [conflicts, setConflicts] = useState([]);
  const [resolvingConflicts, setResolvingConflicts] = useState(false);
  const [conflictError, setConflictError] = useState("");

  // Fetch clarifier questions
  useEffect(() => {
    if (!sessionId) return;

    setLoading(true);
    setFetchError("");

    axios
      .post(
        "https://astra-c8r4.onrender.com/api/agents/clarifier/start",
        { sessionId }
      )
      .then((res) => {
        setQuestions(res.data.questions || []);
      })
      .catch((err) => {
        console.error(err);
        setFetchError(err.response?.data?.message || "Failed to fetch questions");
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();

    if (Object.keys(answers).length === 0) {
      alert("Please answer the questions before submitting.");
      return;
    }

    const formattedAnswers = questions.map((q, idx) => ({
      questionId: idx,
      answer: answers[idx] || "",
    }));

    try {
      setLoading(true);
      setSubmitted(false);
      setConflictError("");

      // Submit answers
      await axios.post(
        "https://astra-c8r4.onrender.com/api/agents/clarifier/submit-answers",
        { sessionId, userAnswers: formattedAnswers }
      );
      setSubmitted(true);

      // Automatically run conflict resolver
      setResolvingConflicts(true);
      const conflictRes = await axios.post(
        "https://astra-c8r4.onrender.com/api/agents/conflict-resolver",
        { sessionId }
      );
      setConflicts(conflictRes.data.conflictOutput?.conflicts || []);
    } catch (error) {
      console.error(error);
      setConflictError(
        error.response?.data?.message || "Failed to submit answers or resolve conflicts"
      );
    } finally {
      setLoading(false);
      setResolvingConflicts(false);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Clairifier</h1>
      <p><strong>Session ID:</strong> {sessionId}</p>

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
        <>
          <p className="mt-6 text-green-400 font-bold text-xl">
            Answers submitted successfully!
          </p>

          {resolvingConflicts ? (
            <p className="mt-4 text-yellow-300 font-semibold">Resolving conflicts...</p>
          ) : conflictError ? (
            <p className="mt-4 text-red-500 font-semibold">{conflictError}</p>
          ) : conflicts.length === 0 ? (
            <p className="mt-4 text-green-300 font-semibold">No conflicts found!</p>
          ) : (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-3">Identified Conflicts:</h2>
              <ul className="space-y-4">
                {conflicts.map((conflict, idx) => (
                  <li key={idx} className="bg-gray-800 p-4 rounded">
                    <p className="font-semibold">Issue: {conflict.issue}</p>
                    <ul className="list-disc list-inside mt-2">
                      {conflict.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Clairifier;
