import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./LogIn.css";

const AdminLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
        role,
      });

      const { result, token } = response.data;

      if (!result || !token) {
        throw new Error("Missing user data or token in response");
      }

      const ProductReview = {
        result,
        token,
      };

      // Store user data and token in sessionStorage
      sessionStorage.setItem("ProductReview", JSON.stringify(ProductReview));

      // Redirect based on role
      if (role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginBody">
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <h1>Welcome, Admin!</h1>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email address"
          id="email"
          required
        />
        <br />
        <br />
        <div className="pswd-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="password"
            required
          />
          <span
            className="pswd-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <label className="normal-role">
          Role: <br />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            id="role"
          >
            <option value="user">user</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br />
        <button type="submit" id="submitLoginbtn" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
        <p>
          Or click <Link to="/register">here</Link> to register
        </p>
      </form>
    </div>
  );
};

export default AdminLogIn;
