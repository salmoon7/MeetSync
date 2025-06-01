import React, { useState } from "react";
import { FaVideo, FaCalendarAlt, FaCopy } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Header from "./Header/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [meetingLink, setMeetingLink] = useState("");
  const [showMeetingLink, setShowMeetingLink] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const createMeeting = async () => {
    try {
      const response = await axios.post(
        "https://chat-and-video.onrender.com/api/meeting/generate-link",
        { userId: user.id }
      );
      setMeetingLink(response.data.meetingLink);
      setShowMeetingLink(true);
    } catch (error) {
      console.error("Error creating meeting:", error);
      setError("Failed to create meeting. Please try again.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink).then(() => {
      alert("Meeting link copied to clipboard");
    });
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen pt-20 px-6 md:px-12 font-sans">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 font-outfit mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Manage and schedule meetings seamlessly with{" "}
            <span className="text-blue-900 font-semibold">MeetSync</span>.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={createMeeting}
            className="flex items-center bg-blue-900 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-md hover:bg-blue-800 transition"
          >
            <FaVideo className="mr-3 text-2xl" /> Create New Meeting
          </button>
        </div>

        {/* Meeting Link Section */}
        {showMeetingLink && (
          <div className="mx-auto mb-10 w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-800 text-base font-medium mb-2">
              🔗 Shareable Meeting Link:
            </p>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={meetingLink}
                className="flex-grow bg-gray-100 border border-gray-300 p-3 rounded-l-md text-gray-700 text-sm font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="bg-blue-900 text-white px-4 py-3 rounded-r-md hover:bg-blue-800 transition flex items-center"
              >
                <FaCopy className="mr-2" /> Copy
              </button>
            </div>
          </div>
        )}

        {/* Schedule Meeting */}
        <div className="mx-auto w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 font-outfit flex items-center mb-4">
            <FaCalendarAlt className="text-blue-900 mr-3 text-xl" />
            Schedule a Meeting
          </h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="w-full rounded-md border border-gray-200 p-4"
          />
          <Link
            to="/signin"
            className="block mt-6 text-center bg-blue-900 text-white px-5 py-2 rounded-md text-base font-semibold hover:bg-blue-800 transition"
          >
            Confirm Schedule
          </Link>
        </div>

        {/* Message / Error */}
        {message && (
          <p className="mt-6 text-green-600 font-medium text-center">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-6 text-red-600 font-medium text-center">{error}</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
