import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header bg-white font-sans shadow-md relative">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="logo">
          <h1 className="font-bold text-3xl tracking-wide text-gray-800">
            <Link to="#">
              Meet<span className="text-blue-900">Sync</span>
            </Link>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-900 transition duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-900 transition duration-300"
          >
            Features
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-900 transition duration-300"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-900 transition duration-300"
          >
            Contact
          </a>
        </nav>

        {/* Join and Host Links for Desktop */}
        <div className="md:hidden text-gray-500 text-xl flex items-center content-center space-x-4">
          <a href="#join">Join</a>
          <a href="#host">Host</a>
        </div>

        {/* Buttons */}
        <div className="buttons hidden md:flex space-x-4">
          <Link to="/signin">
            <div className="signin border border-blue-900 rounded-full text-blue-900 px-6 py-2 hover:bg-blue-100 transition duration-300 shadow-sm">
              Sign In
            </div>
          </Link>
          <Link to="/signup">
            <div className="signup bg-blue-900 rounded-full text-white px-6 py-2 hover:bg-blue-800 transition duration-300 shadow-md">
              Sign Up Free
            </div>
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <div
          onClick={toggleMenuOpen}
          className="md:hidden flex items-center cursor-pointer z-20 relative"
        >
          {isOpen ? (
            <FaTimes size={24} color="blue" />
          ) : (
            <FaBars size={24} color="blue" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transform transition-transform duration-500 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } bg-white shadow-lg absolute top-0 left-0 w-full z-10`}
      >
        <div className="logo mt-4 pl-4">
          <h1 className="font-bold text-3xl tracking-wide text-gray-800">
            <Link to="#">
              Meet<span className="text-blue-900">Sync</span>
            </Link>
          </h1>
        </div>
        <nav className="flex flex-col items-center space-y-6 py-6 text-lg">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-900 transition duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-900 transition duration-300"
          >
            Features
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-900 transition duration-300"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-900 transition duration-300"
          >
            Contact
          </a>

          {/* Join and Host Links for Mobile */}
          <div className="flex space-x-4 text-gray-500">
            <a href="#join">Join</a>
            <a href="#host">Host</a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex space-x-4">
            <Link to="/signin">
              <div className="signin border border-blue-900 rounded-full text-blue-900 px-6 py-2 hover:bg-blue-100 transition duration-300 shadow-sm">
                Sign In
              </div>
            </Link>
            <Link to="/signup">
              <div className="signup bg-blue-900 rounded-full text-white px-6 py-2 hover:bg-blue-800 transition duration-300 shadow-md">
                Sign Up Free
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
