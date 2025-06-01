import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-blue-900 text-white py-10 px-6 md:px-20 font-sans"
      id="contact"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Intro */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Meet<span className="text-yellow-300">Sync</span>
          </h1>
          <p className="text-sm text-gray-200">
            A powerful platform for online meetings, remote work, and team
            collaboration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-yellow-300 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-yellow-300 transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-300 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-3 text-sm text-gray-200">
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> <span>07060787292</span>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> <span>Lagos, Nigeria</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> <span>support@meetsync.com</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4 text-xl text-white">
            <a href="#" className="hover:text-yellow-300">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} MeetSync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
