import React from "react";

const Analyzer = ({ onComplete }) => {
  return (
    <div className="text-center">
      <p className="mb-4">Analyzer Component</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onComplete}
      >
        Complete Step
      </button>
    </div>
  );
};

export default Analyzer;
