import React from "react";
import { Routes, Route } from "react-router-dom";
import Session from "./components/Session";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AgentsPage from "./components/AgentsPage";
import Analyzer from "./components/Analyzer";
import Conflict from "./components/Conflict";
import Validate from "./components/Validate";
import Priorities from "./components/Priorities";
import "./output.css";

function App() {
  return (
    <div className="max-w-full max-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/conflict" element={<Conflict />} />
        <Route path="/priorities" element={<Priorities />} />
        <Route path="/session" element={<Session />} />
        <Route path="/validate" element={<Validate />} />
      </Routes>
    </div>
  );
}

export default App;
