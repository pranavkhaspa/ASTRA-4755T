import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

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

    fetchSummary();
  }, [sessionId]);

  const downloadPDF = () => {
    if (!summary) return;

    const doc = new jsPDF('p', 'pt', 'a4');
    let y = 40;

    doc.setFontSize(16);
    doc.text('Session Summary', 40, y);
    y += 30;

    const addText = (label, value) => {
      if (!value) return;
      const text = `${label}: ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}`;
      const splitText = doc.splitTextToSize(text, 500);
      doc.setFontSize(12);
      doc.text(splitText, 40, y);
      y += splitText.length * 14 + 10;
      if (y > 750) { doc.addPage(); y = 40; }
    };

    // Add main session info
    addText('Session ID', summary.sessionId);
    addText('User ID', summary.userId);
    addText('Project Idea', summary.projectIdea);
    addText('Status', summary.status);
    addText('Created At', new Date(summary.createdAt).toLocaleString());
    addText('Updated At', new Date(summary.updatedAt).toLocaleString());

    // Clarifier
    addText('Clarifier Questions', summary.clarifier?.questions);
    addText('Draft Requirements', summary.clarifier?.draftRequirements);
    addText('User Answers', summary.clarifier?.userAnswers);

    // Conflicts
    addText('Conflicts', summary.conflicts);

    // Validation
    addText('Feasibility Report', summary.validation?.feasibilityReport);
    addText('Risk Level', summary.validation?.riskLevel);

    // Prioritization
    addText('Prioritization', summary.prioritization);

    // Final Summary String
    addText('Final Summary', summary.finalSummary);

    doc.save(`Session_${sessionId}_Summary.pdf`);
  };

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Session Summary</h1>

      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        {JSON.stringify(summary, null, 2)}
      </pre>

      <button
        onClick={downloadPDF}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Summarizer;
