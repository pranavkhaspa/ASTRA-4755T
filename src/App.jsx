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
import Clarifier from "./components/Clarifier";
import Summarizer from "./components/Summarizer";
import "./output.css";
import ProfileDashboard from "./components/ProfileDashboard";

function App() {
  return (
    <div className="max-w-full max-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/conflict" element={<Conflict />} />
        <Route path="/priorities" element={<Priorities />} />
        <Route path="/session" element={<Session />} />
        <Route path="/validate" element={<Validate />} />
        <Route path="/Profile" element={<ProfileDashboard/>}></Route>
        <Route path="/clarifier" element={<Clarifier/>}></Route>
         <Route path="/summarizer" element={<Summarizer/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
