import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CallHeader from "./Header/CallHeader";
import {
  FaVideo,
  FaVideoSlash,
  FaRegSmile,
  FaPaperPlane,
  FaShareSquare,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhoneSlash,
  FaComments, // Import chat icon
} from "react-icons/fa";

const VideoCall = ({ token, user }) => {
  const [stream, setStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [waitingRoom, setWaitingRoom] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const myVideo = useRef();
  const socket = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const meetingId = queryParams.get("meetingId");

  const [chatVisible, setChatVisible] = useState(false); // State for chat visibility

  const [otherUsers, setOtherUsers] = useState(["Demo User"]); // Initial demo user
  const currentUser = user || JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser) {
      console.error("No user information available");
      return;
    }

    // Initialize WebSocket connection
    socket.current = new WebSocket(`wss://chat-and-video.onrender.com`);

    socket.current.onopen = () => {
      console.log("WebSocket connection opened");
      socket.current.send(`register:${currentUser._id}`);
    };

    socket.current.onmessage = (event) => {
      const receivedMessage = event.data;
      if (receivedMessage.startsWith("forum:")) {
        const [, senderId, text] = receivedMessage.split(":");
        const newMessage = {
          text,
          sender: senderId,
          initials: senderId
            .split(" ")
            .map((n) => n[0])
            .join(""),
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if (receivedMessage.startsWith("userJoinRequest:")) {
        const [, userId] = receivedMessage.split(":");
        setWaitingRoom((prevUsers) => [...prevUsers, userId]);
      } else if (receivedMessage.startsWith("userApproved:")) {
        const [, userId] = receivedMessage.split(":");
        setApprovedUsers((prevUsers) => [...prevUsers, userId]);
        setOtherUsers((prevUsers) => [...prevUsers, userId]); // Move to active users
      } else if (receivedMessage.startsWith("userLeave:")) {
        const [, userId] = receivedMessage.split(":");
        setOtherUsers((prevUsers) => prevUsers.filter((id) => id !== userId));
      }
    };

    socket.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [currentUser]);
  const toggleChat = () => {
    setChatVisible((prev) => !prev);
  };

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        myVideo.current.srcObject = mediaStream;
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    getUserMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.current.send(`forum:${currentUser.name}:${message}`);
      const newMessage = {
        text: message,
        sender: "You",
        initials: currentUser.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  // Handle sending message on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(); // Call sendMessage when Enter is pressed
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled; // Toggle video track
      setVideoEnabled(videoTrack.enabled); // Update state
    }
  };

  const toggleMicrophone = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicEnabled(audioTrack.enabled);
    }
  };

  const startScreenShare = async () => {
    if (screenSharing) {
      const tracks = myVideo.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      myVideo.current.srcObject = stream; // Reset to original stream
      setScreenSharing(false);
    } else {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        setStream(screenStream);
        myVideo.current.srcObject = screenStream; // Set screen sharing stream
        setScreenSharing(true);
      } catch (error) {
        console.error("Error accessing display media.", error);
      }
    }
  };

  const approveUser = (userId) => {
    socket.current.send(`approve:${userId}`);
    setWaitingRoom((prevUsers) => prevUsers.filter((id) => id !== userId));
    setApprovedUsers((prevUsers) => [...prevUsers, userId]);
  };

  const leaveMeeting = () => {
    // Logic to leave the meeting, close the stream, and reset states
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    // Optionally, you can add logic to inform the server about leaving
    if (socket.current) {
      socket.current.send(`leave:${currentUser._id}`);
    }
  };

  // Utility to format time ago
  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return `${seconds} sec ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hrs ago`;
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <CallHeader username={currentUser.name} />
      <div className="flex flex-1 flex-col md:flex-row p-4">
        {/* Video Section */}
        <div className="w-full md:w-3/5 h-3/5 bg-gray-900 flex flex-col items-center justify-center relative mx-auto  md:h-full rounded-3xl">
          <div className="absolute top-2 left-0 right-0 flex justify-center space-x-4 ">
            {otherUsers.map((userId, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white p-2 rounded-md"
              >
                {userId}
              </div>
            ))}
          </div>
          {videoEnabled ? (
            <video
              ref={myVideo}
              playsInline
              muted
              autoPlay
              className="w-full h-full object-inherit "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
          <div className="absolute bottom-4 flex space-x-4">
            <button
              onClick={toggleVideo}
              className="p-2 bg-blue-500 text-white rounded-full"
            >
              {videoEnabled ? <FaVideo /> : <FaVideoSlash />}
            </button>
            <button
              onClick={toggleMicrophone}
              className="p-2 bg-yellow-500 text-white rounded-full"
            >
              {micEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>
            <button
              onClick={startScreenShare}
              className="p-2 bg-green-500 text-white rounded-full"
            >
              <FaShareSquare />
            </button>
            <button
              onClick={leaveMeeting}
              className="p-2 bg-red-600 text-white rounded-full"
            >
              <FaPhoneSlash />
            </button>
            <button
              onClick={toggleChat}
              className="p-2 bg-gray-500 text-white rounded-full"
            >
              <FaComments />
            </button>
          </div>
        </div>

        {/* Chat Section */}
        <div
          className={`flex-1 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col ${
            chatVisible ? "block" : "hidden md:flex"
          }`}
        >
          {/* Chat Header */}
          <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Live Chat</h2>
            <span className="bg-white text-blue-500 px-2 py-1 rounded-full">
              {messages.length} Messages
            </span>
            {/* Toggle chat visibility on small screens */}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start space-x-2">
                {/* Sender initials */}
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
                  {msg.initials}
                </div>

                {/* Message bubble */}
                <div className="flex-1">
                  <div className="bg-gray-200 p-3 rounded-t-lg rounded-br-lg">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {timeAgo(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Waiting Room */}
            {waitingRoom.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Waiting Room</h3>
                {waitingRoom.map((userId, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
                  >
                    <span>{userId}</span>
                    <button
                      onClick={() => approveUser(userId)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="bg-gray-100 p-4 flex items-center">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 p-2 border rounded-lg focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              <FaPaperPlane />
            </button>
            <button className="ml-2 p-2 bg-gray-300 rounded-lg">
              <FaRegSmile />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
