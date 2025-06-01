import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import Landing from "./components/Landing";
import VideoCall from "./components/VideoCall";
import Dashboard from "./components/DashBoard";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Footer from "./components/Contact";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      <Footer /> {/* Optional but recommended for consistency */}
    </Router>
  );
}

export default App;
