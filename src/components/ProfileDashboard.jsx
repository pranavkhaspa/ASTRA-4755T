import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";

const ProfileDashboard = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const cardRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  useEffect(() => {
    // Animate card entrance
    gsap.from(cardRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" });

    // Floating blobs animation
    gsap.to(blob1Ref.current, {
      y: 20,
      x: 20,
      repeat: -1,
      yoyo: true,
      duration: 8,
      ease: "sine.inOut",
    });
    gsap.to(blob2Ref.current, {
      y: -20,
      x: -25,
      repeat: -1,
      yoyo: true,
      duration: 10,
      ease: "sine.inOut",
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;

        // Fetch user info
        const userRes = await axios.get(`https://your-backend.com/api/users/${userId}`);
        setUserInfo(userRes.data);

        // Fetch user's sessions
        const sessionsRes = await axios.get(`https://your-backend.com/api/sessions/user/${userId}`);
        setSessions(sessionsRes.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div className="text-black text-center mt-20">Loading...</div>;

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 overflow-hidden">
      {/* Floating blobs */}
      <div
        ref={blob1Ref}
        className="absolute w-80 h-80 bg-pink-500/40 rounded-full filter blur-3xl mix-blend-multiply top-20 left-20"
      ></div>
      <div
        ref={blob2Ref}
        className="absolute w-96 h-96 bg-yellow-400/30 rounded-full filter blur-3xl mix-blend-multiply bottom-20 right-20"
      ></div>

      {/* Profile Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-3xl p-10 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl flex flex-col gap-8 animate-fadeIn text-white"
      >
        <h1 className="text-4xl font-extrabold text-center mb-6">Profile Dashboard</h1>

        {/* User Info */}
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3">User Info</h2>
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>

        {/* Session History */}
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Session History</h2>
          <p><strong>Total Sessions:</strong> {sessions.length}</p>
          <ul className="list-disc pl-5 mt-2">
            {sessions.map((session, index) => (
              <li key={session.id}>
                Session {index + 1} - {session.title || "Untitled"}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3">FAQ</h2>
          <ul className="list-disc pl-5">
            <li>How do I create a new session?</li>
            <li>Can I delete a session?</li>
            <li>How do I update my profile info?</li>
          </ul>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ProfileDashboard;
