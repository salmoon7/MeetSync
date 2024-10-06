import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import conference from "../../assets/conference6.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch(
        "https://chat-and-video.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json(); // Parse the response

      if (response.ok) {
        // Store user object and token in localStorage
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log(JSON.stringify(result.user)); // Store the user object
        localStorage.setItem("token", result.token); // Store the token
        setLoading(false); // Stop loading

        // Generate a random meeting ID
        const meetingId = Math.random().toString(36).substring(2, 15);

        // Navigate to the video call component, passing the meetingId as a query parameter
        navigate(`/video-call/${meetingId}`, {
          state: { user: result.user },
        });
      } else {
        alert(result.message || "Login failed. Please check your credentials.");
        setLoading(false); // Stop loading
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Stop loading on error
      alert("An error occurred. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <div className="lg:w-2/5 w-full h-64 lg:h-auto bg-gray-200 flex items-center justify-center">
        <img
          src={conference}
          alt="Sign in visual"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="lg:w-3/5 w-full bg-white p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Sign In
          </h2>

          {/* Catchy Note */}
          <p className="text-center text-gray-500 mb-6">
            "Connect with your team effortlessly. Sign in to MeetSync and start
            your video conference in seconds!"
          </p>

          <form onSubmit={handleSubmit}>
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

            {/* Forgot Password Link */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                className="text-sm text-blue-500 hover:underline focus:outline-none"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
