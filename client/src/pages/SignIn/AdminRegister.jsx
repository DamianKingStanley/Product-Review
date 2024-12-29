import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [role, setRole] = useState("admin");
  const [secretKey, setSecretKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          email,
          phone,
          password,
          role,
          secretKey,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setRegisterMessage("Registered successfully");
        setLoading(false);

        navigate("/as-admin-login");
      } else {
        const errorResponseData = await response.json();
        setRegisterMessage(
          errorResponseData.message || "Registration failed. Try again later."
        );
        setLoading(false);
      }
    } catch (error) {
      setRegisterMessage("Registration failed. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="SignInbody">
      <br /> <br />
      <section className="register">
        {registerMessage && (
          <div
            className={
              registerMessage === "Registered successfully"
                ? "success-message"
                : "error-message"
            }
          >
            {registerMessage}
          </div>
        )}
        <h1> Admin-Product Review</h1>
        <p> Fill the form to get started</p>
        <br />
        <div id="registerform">
          <div>
            <input
              type="text"
              name="fullname"
              id="FullName"
              placeholder="Enter your full name"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="username"
              id="Username"
              placeholder="Username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <input
              type="email"
              name="email"
              id="emailAddress"
              placeholder="Enter valid email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="phone"
              id="phoneNumber"
              placeholder="Enter phone number"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                required
                onChange={handlePasswordChange}
              />
            </div>

            <select
              name="role"
              id="role"
              required
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            <br />
            {role === "admin" && (
              <input
                type="text"
                name="secretKey"
                id="secretKey"
                placeholder="enter the admin key"
                required
                onChange={(e) => setSecretKey(e.target.value)}
              />
            )}
            <br />
            <button onClick={submitForm} id="submitbtn">
              {loading ? "Please wait..." : "Register"}
            </button>
            <br />
            <br />
          </div>
          <br />
          <p id="already">
            Already have an account? <Link to="/logIn">Log in</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminRegister;
