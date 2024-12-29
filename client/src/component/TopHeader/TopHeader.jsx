import React, { useState, useEffect } from "react";
import "./TopHeader.css";
import { Link } from "react-router-dom";
import { FaSearch, FaPhone, FaUserCircle } from "react-icons/fa";
import Logout from "../Logout/Logout";

const TopHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userid, setUserId] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = sessionStorage.getItem("ProductReview");
      return token !== null && token !== undefined;
    };
    setIsLoggedIn(checkLoginStatus());
  }, []);

  useEffect(() => {
    const userData = sessionStorage.getItem("ProductReview");
    if (userData) {
      const parsedData = JSON.parse(userData); // Parse stored JSON data
      setUser(parsedData.result.username); // Store the user data in `user`
    }
  }, []);
  useEffect(() => {
    const userData = sessionStorage.getItem("ProductReview");
    if (userData) {
      const parsedData = JSON.parse(userData); // Parse stored JSON data
      setUserId(parsedData.result.id); // Store the user data in `user`
    }
  }, []);

  const login = () => {
    window.location.href = "/login";
  };

  return (
    <div className="TopHeader">
      <section className="TopHeaderContainer">
        <div className="TopHeaderOne">
          <Link to="/">
            <h1>PRODUCT REVIEW</h1>
          </Link>
        </div>
        <div className="TopHeaderTwo">
          <div>
            <input type="search" name="search" id="search" /> <FaSearch />
          </div>
        </div>
        <div className="TopHeaderThree">
          <div className="userPart">
            {isLoggedIn && user && (
              <div className="loggedInUser">
                <div className="userIcon">
                  <Link to={`/user/profile/${userid}`}>
                    <span className="username">{user}</span>
                  </Link>
                </div>
              </div>
            )}

            {!isLoggedIn && (
              <button id="loginBtn" onClick={login}>
                LOGIN
              </button>
            )}
            <Logout />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopHeader;
