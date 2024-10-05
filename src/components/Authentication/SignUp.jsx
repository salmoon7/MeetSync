import React, { useState } from "react";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import conference from "../../assets/conference6.png";
import { BiKey } from "react-icons/bi";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts

    console.log({ name, email, password }); // Log the values before sending

    try {
      const response = await fetch(
        "https://chat-and-video.onrender.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }), // Ensure name, email, password have values
        }
      );

      const result = await response.json();
      setLoading(false); // Stop loading when the request is done

      if (response.ok) {
        alert(result.message); // Show success message
        window.location.href = "/signin"; // Redirect to login page
      } else {
        console.log(result); // Log the result to see the exact error
        alert(result.message || "An error occurred" + result.error); // Show error message
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      console.error(error); // Log the error to the console
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Left side: Image (40% on large screens, full width on small screens) */}
      <div className="lg:w-2/5 w-full h-64 lg:h-auto bg-gray-200 flex items-center justify-center">
        <img
          src={conference}
          alt="Sign up visual"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side: Sign-up form (60% on large screens, full width on small screens) */}
      <div className="lg:w-3/5 w-full bg-white p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
            Join MeetSync Today!
          </h2>
          <p className="text-center text-sm mb-4 text-gray-500">
            Connect, collaborate, and grow with MeetSync.
          </p>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing Up..." : "Sign Up"} {/* Show loading text */}
            </button>

            <p className="text-center text-sm mt-4 text-gray-500">
              By signing up, you agree to the{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                terms of MeetSync
              </a>
              .
            </p>
          </form>

          <div className="flex items-center justify-between mt-6">
            <hr className="w-full border-gray-300" />
            <span className="mx-4 text-sm text-gray-500">Or sign up with</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Social Sign-up buttons */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
              <BiKey className="text-2xl mb-2 text-black" />
              <span className="text-sm text-gray-700">SSO</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
              <FaApple className="text-2xl mb-2 text-gray-800" />
              <span className="text-sm text-gray-700">Apple</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
              <FaGoogle className="text-2xl mb-2 text-red-500" />
              <span className="text-sm text-gray-700">Google</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
              <FaFacebook className="text-2xl mb-2 text-blue-800" />
              <span className="text-sm text-gray-700">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
