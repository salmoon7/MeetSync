// src/components/Features.jsx
import React from "react";
import {
  FaVideo,
  FaCalendarAlt,
  FaShieldAlt,
  FaUsers,
  FaSyncAlt,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaVideo className="text-blue-900 text-3xl" />,
    title: "Instant Video Meetings",
    description:
      "Start secure, high-quality video meetings with a single click, ensuring seamless collaboration.",
  },
  {
    icon: <FaCalendarAlt className="text-blue-900 text-3xl" />,
    title: "Smart Scheduling",
    description:
      "Effortlessly schedule meetings with our intuitive calendar integration and availability tracking.",
  },
  {
    icon: <FaShieldAlt className="text-blue-900 text-3xl" />,
    title: "End-to-End Encryption",
    description:
      "Protect your conversations with robust encryption, maintaining privacy and compliance.",
  },
  {
    icon: <FaUsers className="text-blue-900 text-3xl" />,
    title: "Team Collaboration",
    description:
      "Enhance teamwork with shared notes, task assignments, and real-time document editing.",
  },
  {
    icon: <FaSyncAlt className="text-blue-900 text-3xl" />,
    title: "Cross-Platform Sync",
    description:
      "Access your meetings and data across all devices, ensuring continuity and flexibility.",
  },
  {
    icon: <FaChartLine className="text-blue-900 text-3xl" />,
    title: "Analytics Dashboard",
    description:
      "Gain insights into meeting metrics to optimize productivity and engagement.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Features</h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover the powerful tools that make MeetSync your ultimate meeting
          solution.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
