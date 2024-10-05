import React, { useState, useEffect } from "react";

const CallHeader = ({ username }) => {
  const [dateTime, setDateTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get initials from username
  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0].toUpperCase())
          .join("")
      : "";
  };

  return (
    <div className="header bg-white font-sans shadow-md flex justify-between items-center p-4">
      {/* Logo */}
      <div className="logo">
        <h1 className="font-bold text-2xl tracking-wide text-gray-800">
          Meet<span className="text-blue-900">Sync</span>
        </h1>
      </div>

      {/* User initials and Date/Time */}
      <div className="user-info flex items-center space-x-6">
        <div className="user-initials bg-blue-700 text-white font-bold p-3 rounded-full">
          {getInitials(username)}
        </div>
        <div className="date-time text-gray-600">
          {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default CallHeader;
