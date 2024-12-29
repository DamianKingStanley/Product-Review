import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaUserCircle, FaEdit } from "react-icons/fa"; // Importing the avatar and edit icons
import "./UserProfile.css"; // Assuming you want to add custom CSS for styling

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/profile/${userId}`
        );
        setProfile(response.data); // Save the user data to state
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="profile-header">
        <div className="avatar-container">
          <FaUserCircle className="avatar-icon" /> {/* Avatar Icon */}
        </div>
        <h1 className="profile-name">{profile?.fullname}</h1>
        <p className="profile-username">@{profile?.username}</p>
        <Link to={`/edit-profile/${userId}`} className="edit-profile-button">
          <FaEdit className="edit-icon" /> Edit Profile{" "}
          {/* Edit Profile Button */}
        </Link>
      </div>

      <div className="profile-details">
        <div className="profile-detail-item">
          <strong>Email:</strong> <span>{profile?.email}</span>
        </div>
        <div className="profile-detail-item">
          <strong>Phone Number:</strong>{" "}
          <span>{profile?.phoneNumber || "Not provided"}</span>
        </div>
        <div className="profile-detail-item">
          <strong>Role:</strong> <span>{profile?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
