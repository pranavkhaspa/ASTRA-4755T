import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Import your component modules
import Analyzer from "./Clarifier";
import Conflict from "./Conflict";
import Validate from "./Validate";
import Priorities from "./Priorities";

const AgentsPage = () => {
  const [currentStep, setCurrentStep] = useState("analyzer");
  const location = useLocation();

  // ✅ sessionId comes from navigation state or fallback to localStorage
  const sessionId = location.state?.sessionId || localStorage.getItem("sessionId");

  const nextStep = (step) => setCurrentStep(step);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-10">Agents Flow</h1>
      <p className="mb-6 text-gray-600">Current Session: {sessionId}</p>

      <div className="grid grid-cols-2 gap-10 relative">
        {/* Analyzer */}
        <div className="flex flex-col items-center">
          <div
            className={`p-6 rounded-xl shadow-lg bg-white ${
              currentStep === "analyzer" ? "border-4 border-blue-500" : ""
            }`}
          >
            <Analyzer sessionId={sessionId} onComplete={() => nextStep("conflict")} />
          </div>
          <div className="h-10 w-1 border-l-2 border-black"></div>
          <div className="text-center mt-2 font-semibold">Analyzer</div>
        </div>

        {/* Conflict */}
        <div className="flex flex-col items-center mt-12">
          <div
            className={`p-6 rounded-xl shadow-lg bg-white ${
              currentStep === "conflict" ? "border-4 border-red-500" : ""
            }`}
          >
            <Conflict sessionId={sessionId} onComplete={() => nextStep("validate")} />
          </div>
          <div className="h-10 w-1 border-l-2 border-black"></div>
          <div className="text-center mt-2 font-semibold">Conflict</div>
        </div>

        {/* Validate */}
        <div className="flex flex-col items-center">
          <div
            className={`p-6 rounded-xl shadow-lg bg-white ${
              currentStep === "validate" ? "border-4 border-green-500" : ""
            }`}
          >
            <Validate sessionId={sessionId} onComplete={() => nextStep("priorities")} />
          </div>
          <div className="h-10 w-1 border-l-2 border-black"></div>
          <div className="text-center mt-2 font-semibold">Validate</div>
        </div>

        {/* Priorities */}
        <div className="flex flex-col items-center mt-12">
          <div
            className={`p-6 rounded-xl shadow-lg bg-white ${
              currentStep === "priorities" ? "border-4 border-purple-500" : ""
            }`}
          >
            <Priorities sessionId={sessionId} />
          </div>
          <div className="text-center mt-2 font-semibold">Priorities</div>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
