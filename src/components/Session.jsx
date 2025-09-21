import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Summarizer = ({ sessionId }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/summarize/${sessionId}`);
        setSummary(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch summary.');
        setLoading(false);
      }
    };

    if (sessionId) fetchSummary();
  }, [sessionId]);

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!summary) return <p>No summary found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Session Summary</h1>

      <div className="bg-gray-100 p-4 rounded overflow-x-auto max-h-[70vh] overflow-y-auto">
        <pre>{JSON.stringify(summary, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Summarizer;
