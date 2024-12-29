import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBullhorn, FaEye, FaExclamationTriangle } from "react-icons/fa";
import "./MissionVision.css"; // Ensure this file is updated with new styles

const MissionVision = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status
    const token = sessionStorage.getItem("ProductReview");
    setIsLoggedIn(token !== null && token !== undefined);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/share-review"); // Navigate to Share Review page if logged in
    } else {
      navigate("/login"); // Navigate to Login page if not logged in
    }
  };

  return (
    <div className="missionVisionContainer">
      <div className="missionVisionContent">
        <div className="missionSection">
          <FaBullhorn className="icon" />
          <div className="text">
            <h2>Our Mission</h2>
            <p>
              Our mission is to save people from buying bad products and
              services. We strive to provide honest and accurate reviews to help
              users make informed decisions.
            </p>
          </div>
        </div>

        <div className="visionSection">
          <FaEye className="icon" />
          <div className="text">
            <h2>Our Vision</h2>
            <p>
              Our vision is to see that business owners start giving only good
              products and services. We aim to foster a marketplace where
              quality is prioritized.
            </p>
          </div>
        </div>

        <div className="warningSection">
          <FaExclamationTriangle className="icon" />
          <div className="text">
            <h2>Warning & Disclaimer</h2>
            <p>
              Please do not submit fake reviews or lie about a product. Doing so
              could harm businesses and mislead other users. We encourage you to
              provide only accurate reviews so others do not fall victim to
              false information.
            </p>
          </div>
        </div>
      </div>
      <button className="getStartedButton" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default MissionVision;
