import React, { useState } from "react";
import { FaVideo, FaCalendarAlt, FaLink } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Calendar from "react-calendar";
import CallHeader from "./Header/Header";
import "react-calendar/dist/Calendar.css";
import Header from "./Header/Header";

const Landing = () => {
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [meetingLink, setMeetingLink] = useState("");

  // Fetch user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Adjust this line if you're using a different method for user state

  const handleJoin = (e) => {
    e.preventDefault(); // Prevent the default link behavior

    // Check if the user is signed in
    if (!user) {
      alert("You need to be signed in to join a meeting.");
      navigate("/signin"); // Redirect to the sign-in page
      return;
    }

    // Extract meeting ID from the link
    const meetingIdMatch = meetingLink.match(/\/video-call\/([a-zA-Z0-9]+)/);
    if (meetingIdMatch) {
      const meetingId = meetingIdMatch[1];

      // Navigate to the video call component with the meeting ID
      navigate(`/video-call/${meetingId}`);
    } else {
      alert("Please enter a valid meeting link.");
    }
  };

  const generateMeetingId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  // Function to handle starting an instant meeting
  const handleStartInstantMeeting = () => {
    const newMeetingId = generateMeetingId();
    setMeetingId(newMeetingId);
    navigate(`/signin?meetingId=${newMeetingId}`);
  };

  return (
    <>
      <Header />
      <div>
        <div className="bg-gray-50 min-h-screen flex flex-col items-center pt-20 px-6 md:px-12">
          {/* Hero Section */}
          <div className="text-center max-w-2xl mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Video call and meet with everyone.
            </h1>
            <p className="text-lg text-gray-600">
              Collaborate and celebrate from anywhere with MeetSync. Create
              secure video calls that can easily be joined by anyone.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 w-full max-w-md">
            {/* New Meeting Button (Unchanged, triggers meeting options) */}
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="flex items-center justify-center w-full md:w-auto bg-blue-900 text-white rounded-full px-6 py-3 shadow-lg hover:bg-blue-800 transition duration-300"
            >
              <FaVideo className="mr-3" /> New Meeting
            </button>

            {/* Enter Code or Link Input */}
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 shadow-sm w-full md:w-auto">
              <FaLink className="mr-3 text-gray-500" />
              <input
                type="text"
                placeholder="Enter a code or link"
                className="outline-none flex-grow text-gray-700"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)} // Update state on input change
              />
              <button
                onClick={handleJoin} // Handle click to join
                className="ml-3 text-blue-900 font-semibold hover:underline"
              >
                Join
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-10 w-full max-w-4xl border-gray-200" />

          {/* Learn More Section */}
          <div className="text-center text-gray-500">
            <p className="hover:underline cursor-pointer">
              Learn more about MeetSync
            </p>
          </div>
        </div>

        {/* Meeting Options (Visible on New Meeting button click) */}
        {showOptions && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg px-6 py-4 w-11/12 md:w-auto max-w-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              New Meeting Options
            </h3>
            <div className="flex flex-col space-y-3">
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
                <FaCalendarAlt className="mr-3 text-blue-900" />
                <span>Schedule a meeting</span>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  className="mt-2"
                />
                <Link
                  to="/signin"
                  className="mt-3 bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800"
                >
                  Confirm Schedule
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Landing;
