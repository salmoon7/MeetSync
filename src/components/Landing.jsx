import React, { useState } from "react";
import { FaVideo, FaCalendarAlt, FaLink, FaCopy } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "./Header/Header";
import axios from "axios";

const Landing = () => {
  const navigate = useNavigate();
  const [meetingLink, setMeetingLink] = useState("");
  const [showMeetingLink, setShowMeetingLink] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You need to be signed in to join a meeting.");
      navigate("/signin");
      return;
    }

    try {
      const meetingId = meetingLink.split("/").pop();
      const response = await axios.post(
        "https://chat-and-video.onrender.com/api/meeting/join",
        {
          meetingId,
          userId: user.id,
        }
      );
      setMessage(response.data.message);
      navigate(`/video-call/${meetingId}`);
    } catch (err) {
      setError("Error joining the meeting. Please try again.");
      console.error(err);
    }
  };

  const createMeeting = async () => {
    try {
      const response = await fetch(
        "https://chat-and-video.onrender.com/api/meeting/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMeetingLink(data.meetingLink);
        setShowMeetingLink(true);
      } else {
        throw new Error("Failed to create meeting");
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const handleStartInstantMeeting = async () => {
    const newMeetingLink = await createMeeting();
    if (newMeetingLink) {
      navigate(newMeetingLink);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink).then(() => {
      alert("Meeting link copied to clipboard");
    });
  };

  return (
    <>
      <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-24 px-6 md:px-12">
        {/* Hero */}
        <section className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Video call and meet with everyone.
          </h1>
          <p className="text-lg text-gray-600">
            Collaborate and celebrate from anywhere with MeetSync. Create secure
            video calls that are easy to join.
          </p>
        </section>

        {/* Join or Create Meeting */}
        <section className="max-w-xl mx-auto space-y-6">
          {/* New Meeting */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center justify-center w-full bg-blue-900 text-white font-semibold rounded-xl px-6 py-3 hover:bg-blue-800 transition-all"
          >
            <FaVideo className="mr-3" /> New Meeting
          </button>

          {/* Input for Join */}
          <form
            onSubmit={handleJoin}
            className="flex items-center bg-white shadow-sm border border-gray-200 rounded-xl px-4 py-3"
          >
            <FaLink className="mr-3 text-gray-500" />
            <input
              type="text"
              placeholder="Enter a code or link"
              className="flex-grow outline-none text-gray-700"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
            />
            <button
              type="submit"
              className="ml-3 text-blue-900 font-medium hover:underline"
            >
              Join
            </button>
          </form>

          {/* Show Meeting Link */}
          {showMeetingLink && (
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-sm text-gray-700 mb-2">
                Share this link to invite others:
              </p>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  readOnly
                  value={meetingLink}
                  className="flex-grow bg-gray-100 px-3 py-2 rounded-md text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className="flex items-center text-blue-900 font-medium hover:underline"
                >
                  <FaCopy className="mr-2" />
                  Copy
                </button>
              </div>
            </div>
          )}

          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </section>

        <hr className="my-14 max-w-4xl mx-auto border-gray-200" />

        {/* Learn More */}
        <p className="text-center text-gray-500 hover:underline cursor-pointer">
          Learn more about MeetSync
        </p>

        {/* Modal Options */}
        {showOptions && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-xl p-6 w-[90%] md:w-[400px] z-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              New Meeting Options
            </h3>
            <div className="space-y-4">
              <Link
                to="/signin"
                className="flex items-center text-gray-700 hover:underline"
              >
                <FaLink className="mr-3 text-blue-900" />
                Create meeting for later
              </Link>
              <button
                onClick={handleStartInstantMeeting}
                className="flex items-center text-gray-700 hover:underline"
              >
                <FaVideo className="mr-3 text-blue-900" />
                Start an instant meeting
              </button>
              <div className="text-gray-700">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="mr-3 text-blue-900" />
                  <span>Schedule a meeting</span>
                </div>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  className="mt-2 rounded-md border border-gray-200"
                />
                <Link
                  to="/signin"
                  className="mt-4 inline-block bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                >
                  Confirm Schedule
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Landing;
