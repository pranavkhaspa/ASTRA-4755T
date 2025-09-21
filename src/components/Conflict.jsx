import React, { useEffect, useState } from "react";
import axios from "axios";

const Conflict = ({ sessionId }) => {
  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    const fetchConflicts = async () => {
      setLoading(true);
      setFetchError("");
      try {
        const res = await axios.get(
          `https://astra-c8r4.onrender.com/api/agents/get-conflicts`,
          { headers: { "x-session-id": sessionId } }
        );
        setConflicts(res.data.conflicts || []);
      } catch (err) {
        console.error(err);
        setFetchError(err.response?.data?.message || "Failed to generate conflicts");
      } finally {
        setLoading(false);
      }
    };

    fetchConflicts();
  }, [sessionId]);

  const handleOptionSelect = (conflictIdx, optionIdx) => {
    setSelectedOptions(prev => ({ ...prev, [conflictIdx]: optionIdx }));
  };

  const submitResolution = async () => {
    if (!sessionId) return;

    try {
      const resolvedIndices = Object.values(selectedOptions);
      if (resolvedIndices.length !== conflicts.length) {
        alert("Please select an option for all conflicts.");
        return;
      }

      const res = await axios.post(
        `https://astra-c8r4.onrender.com/api/agents/resolve-conflict`,
        { chosenOptionIndex: resolvedIndices[0] }, // Backend currently accepts one choice
        { headers: { "x-session-id": sessionId } }
      );
      setSubmitStatus(res.data.message || "Conflict resolved successfully!");
    } catch (err) {
      console.error(err);
      setSubmitStatus(err.response?.data?.message || "Failed to resolve conflicts");
    }
  };

  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Conflict Resolver</h2>

      {loading ? (
        <p className="text-yellow-300 font-semibold">Generating conflict options...</p>
      ) : fetchError ? (
        <p className="text-red-500 font-semibold">{fetchError}</p>
      ) : conflicts.length === 0 ? (
        <p className="text-green-300 font-semibold">No conflicts found!</p>
      ) : (
        <>
          <ul className="space-y-4">
            {conflicts.map((conflict, idx) => (
              <li key={idx} className="bg-gray-800 p-4 rounded border border-gray-700">
                <p className="font-semibold">Issue: {conflict.issue}</p>
                <ul className="list-disc list-inside mt-2">
                  {conflict.options.map((opt, i) => (
                    <li key={i}>
                      <label>
                        <input
                          type="radio"
                          name={`conflict-${idx}`}
                          value={i}
                          checked={selectedOptions[idx] === i}
                          onChange={() => handleOptionSelect(idx, i)}
                          className="mr-2"
                        />
                        {opt}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button
            onClick={submitResolution}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Resolve Selected Conflicts
          </button>
          {submitStatus && <p className="mt-2 text-green-300">{submitStatus}</p>}
        </>
      )}
    </div>
  );
};

export default Conflict;
