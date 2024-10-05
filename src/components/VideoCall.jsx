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
  FaPhoneSlash, // Import the phone slash icon for ending the call
} from "react-icons/fa";

const VideoCall = ({ token, user }) => {
  const [stream, setStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const myVideo = useRef();
  const socket = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const meetingId = queryParams.get("meetingId");

  const [otherUsers, setOtherUsers] = useState(["Demo User"]); // Added a demo user
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
        setMessages((prevMessages) => [
          ...prevMessages,
          `${senderId}: ${text}`,
        ]);
      } else if (receivedMessage.startsWith("userJoin:")) {
        const [, userId] = receivedMessage.split(":");
        setOtherUsers((prevUsers) => [...prevUsers, userId]);
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
      setMessages([...messages, `You: ${message}`]);
      setMessage("");
    }
  };

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
        const videoTrack = screenStream.getVideoTracks()[0];
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

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <CallHeader username={currentUser.name} />
      <div className="flex flex-1 p-4">
        <div className="w-3/5 h-3/5 bg-gray-900 flex flex-col items-center justify-center relative mx-auto">
          <div className="absolute top-2 left-0 right-0 flex justify-center space-x-4">
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
              className="w-full h-full object-cover rounded-lg"
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
              onClick={leaveMeeting} // End call button
              className="p-2 bg-red-600 text-white rounded-full"
            >
              <FaPhoneSlash />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-white flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                {msg}
              </div>
            ))}
          </div>
          <div className="flex p-4 border-t">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress} // Attach the key press handler
              className="flex-1 p-2 border rounded-l"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-500 text-white rounded-r"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
