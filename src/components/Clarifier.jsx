import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Clairifier = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionId, userIdea } = location.state || {};

  const [questions, setQuestions] = useState([]); // store questions with IDs
  const [answers, setAnswers] = useState({});     // answers keyed by question ID
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);     // loading state for questions
  const [isSubmitting, setIsSubmitting] = useState(false); // loading state for submission
  const [fetchError, setFetchError] = useState("");   // error state for fetching
  const [submitError, setSubmitError] = useState(""); // error state for submitting

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
        // Ensure each question has a unique id and text
        const formattedQuestions = res.data.questions.map((q, idx) => 
          typeof q === "string" ? { id: idx, text: q } : q
        );
        setQuestions(formattedQuestions);
      })
      .catch(err => {
        console.error("Error fetching questions:", err);
        setFetchError(err.response?.data?.error || "Failed to fetch questions");
      })
      .finally(() => setLoading(false));
    } else {
        // Handle case where state is missing
        setLoading(false);
        setFetchError("Session ID or User Idea not found. Please start a new session.");
    }
  }, [sessionId, userIdea]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();
    setSubmitError(""); // Clear previous errors

    if (Object.keys(answers).length === 0 || Object.values(answers).every(a => a.trim() === '')) {
      setSubmitError("Please answer at least one question before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Reverting to an array of objects, as it's more standard.
      // The 400 error is likely due to a data type mismatch (e.g., number vs. string for the ID).
      // We will ensure the questionId is explicitly a string.
      const formattedAnswers = questions.map(q => ({
        questionId: String(q.id), // FIX: Explicitly cast the ID to a string
        answer: answers[q.id] || ""
      }));

      const payload = {
        sessionId,
        answers: formattedAnswers,
      };

      // Log the exact payload being sent for easier debugging
      console.log("Submitting payload:", JSON.stringify(payload, null, 2));

      const response = await axios.post(
        "https://astra-c8r4.onrender.com/api/agents/clarifier/submit-answers",
        payload
      );

      console.log("Answers submitted:", response.data);
      setSubmitted(true); // Trigger the success UI

      // Navigate to the next step after a short delay to show the success message
      setTimeout(() => {
        // Navigate to the next agent, passing along the session state
        navigate('/researcher', { state: { sessionId, userIdea } });
      }, 2000);

    } catch (error) {
      console.error("Error submitting answers:", error.response || error);
      const serverError = error.response?.data?.error || "Failed to submit answers. Please check your connection and try again.";
      setSubmitError(serverError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Clarifying Questions</h1>
      <p><strong>Session ID:</strong> {sessionId}</p>
      <p><strong>Your Idea:</strong> {userIdea}</p>

      {loading ? (
        <p className="mt-6 text-yellow-300 font-semibold">Loading questions...</p>
      ) : fetchError ? (
        <p className="mt-6 text-red-500 font-semibold">{fetchError}</p>
      ) : questions.length === 0 ? (
        <p className="mt-6 text-gray-300 font-semibold">No questions found.</p>
      ) : !submitted ? (
        <form onSubmit={handleSubmitAnswers} className="mt-6 space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="flex flex-col">
              <label className="font-semibold mb-2 text-lg">{q.text}</label>
              <textarea
                rows={4}
                className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your answer here..."
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit All Answers'}
          </button>

          {submitError && (
            <p className="mt-4 text-red-500 font-semibold">{submitError}</p>
          )}
        </form>
      ) : (
        <div className="mt-10 text-center">
            <p className="text-green-400 font-bold text-xl">Answers submitted successfully!</p>
            <p className="text-gray-300 mt-2">Proceeding to the next step...</p>
        </div>
      )}
    </div>
  );
};

export default Clairifier;

