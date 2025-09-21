import React, { useEffect, useState } from "react";
import axios from "axios";

const Conflict = ({ sessionId, onComplete }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    const fetchOptions = async () => {
      setLoading(true);
      setFetchError("");

      try {
        const res = await axios.post(
          "https://astra-c8r4.onrender.com/api/agents/conflict-resolver",
          { sessionId } // backend expects sessionId to fetch results
        );
        console.log("Conflict options received:", res.data);
        setOptions(res.data.options || []);
      } catch (err) {
        console.error(err);
        setFetchError(err.response?.data?.error || "Failed to fetch options");
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [sessionId]);

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Conflict Resolver</h1>

      {loading ? (
        <p className="text-yellow-300 font-semibold">Loading options...</p>
      ) : fetchError ? (
        <p className="text-red-500 font-semibold">{fetchError}</p>
      ) : options.length === 0 ? (
        <p className="text-gray-300 font-semibold">No options available.</p>
      ) : (
        <div className="w-full max-w-2xl space-y-4">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <p>{opt}</p>
            </div>
          ))}
        </div>
      )}

      <button
        className="mt-8 px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 font-semibold"
        onClick={onComplete}
      >
        Complete Step
      </button>
    </div>
  );
};

export default Conflict;
