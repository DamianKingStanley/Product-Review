import React, { useState, useEffect, useRef } from "react";
import "./Navibar.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Logout from "../../component/Logout/Logout";

const Navibar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
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
      const parsedData = JSON.parse(userData);
      setUser(parsedData.result.username);
    }
  }, []);
  useEffect(() => {
    const userData = sessionStorage.getItem("ProductReview");
    if (userData) {
      const parsedData = JSON.parse(userData); // Parse stored JSON data
      setUserId(parsedData.result.id); // Store the user data in `user`
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const login = () => {
    window.location.href = "/login";
  };

  return (
    <div className="Navibar" ref={navRef}>
      <div className="NavibarContainer">
        <div className="MobileIcon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={`NaviItems ${isMobileMenuOpen ? "NavItemsMobile" : ""}`}>
          <li className="NaviItem">
            <div onClick={() => toggleDropdown("food")}>Food & Groceries</div>
            <ul
              className={`NaviDropdownMenu ${
                activeDropdown === "food" ? "show" : ""
              }`}
            >
              <li>
                <Link to="/food/packaged-foods" onClick={closeMobileMenu}>
                  Packaged Foods
                </Link>
              </li>
              <li>
                <Link to="/food/fresh-produce" onClick={closeMobileMenu}>
                  Fresh Produce
                </Link>
              </li>
              <li>
                <Link to="/food/snacks" onClick={closeMobileMenu}>
                  Snacks
                </Link>
              </li>
              <li>
                <Link to="/food/beverages" onClick={closeMobileMenu}>
                  Beverages
                </Link>
              </li>
            </ul>
          </li>
          <li className="NaviItem">
            <div onClick={() => toggleDropdown("beauty")}>
              Beauty & Personal Care
            </div>
            <ul
              className={`NaviDropdownMenu ${
                activeDropdown === "beauty" ? "show" : ""
              }`}
            >
              <li>
                <Link to="/beauty/skin-care" onClick={closeMobileMenu}>
                  Skin Care
                </Link>
              </li>
              <li>
                <Link to="/beauty/hair-care" onClick={closeMobileMenu}>
                  Hair Care
                </Link>
              </li>
              <li>
                <Link to="/beauty/fragrances" onClick={closeMobileMenu}>
                  Fragrances
                </Link>
              </li>
              <li>
                <Link to="/beauty/cosmetics" onClick={closeMobileMenu}>
                  Cosmetics
                </Link>
              </li>
            </ul>
          </li>
          <li className="NaviItem">
            <div onClick={() => toggleDropdown("gadget")}>
              Electronics & Gadgets
            </div>
            <ul
              className={`NaviDropdownMenu ${
                activeDropdown === "gadget" ? "show" : ""
              }`}
            >
              <li>
                <Link to="/gadget/phones" onClick={closeMobileMenu}>
                  Phones
                </Link>
              </li>
              <li>
                <Link to="/gadget/laptops" onClick={closeMobileMenu}>
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/gadget/tvs" onClick={closeMobileMenu}>
                  TVs
                </Link>
              </li>
              <li>
                <Link to="/gadget/home-appliances" onClick={closeMobileMenu}>
                  Home Appliances
                </Link>
              </li>
              <li>
                <Link to="/gadget/wearables" onClick={closeMobileMenu}>
                  Wearables (Smartwatches, Fitness trackers)
                </Link>
              </li>
            </ul>
          </li>
          <li className="NaviItem">
            <div onClick={() => toggleDropdown("apparel")}>
              Fashion & Apparel
            </div>
            <ul
              className={`NaviDropdownMenu ${
                activeDropdown === "apparel" ? "show" : ""
              }`}
            >
              <li>
                <Link to="/apparel/men-fashion" onClick={closeMobileMenu}>
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link to="/apparel/women-fashion" onClick={closeMobileMenu}>
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link to="/apparel/footwear" onClick={closeMobileMenu}>
                  Footwear
                </Link>
              </li>
              <li>
                <Link to="/apparel/accessories" onClick={closeMobileMenu}>
                  Accessories (Jewelry, Watches, etc.)
                </Link>
              </li>
            </ul>
          </li>
          <li className="NaviItem">
            <div onClick={() => toggleDropdown("home")}>Home & Living</div>
            <ul
              className={`NaviDropdownMenu ${
                activeDropdown === "home" ? "show" : ""
              }`}
            >
              <li>
                <Link to="/home/furniture" onClick={closeMobileMenu}>
                  Furniture
                </Link>
              </li>
              <li>
                <Link to="/home/kitchen-appliances" onClick={closeMobileMenu}>
                  Kitchen Appliances
                </Link>
              </li>
              <li>
                <Link to="/home/decor-lighting" onClick={closeMobileMenu}>
                  Decor & Lighting
                </Link>
              </li>
              <li>
                <Link to="/home/bedding" onClick={closeMobileMenu}>
                  Bedding
                </Link>
              </li>
            </ul>
          </li>
          <li className="NaviItem">
            <div onClick={() => toggleDropdown("health")}>
              Health & Wellness
            </div>
            <ul
              className={`NaviDropdownMenu ${
                activeDropdown === "health" ? "show" : ""
              }`}
            >
              <li>
                <Link to="/health/supplements" onClick={closeMobileMenu}>
                  Supplements
                </Link>
              </li>
              <li>
                <Link to="/health/fitness-equipment" onClick={closeMobileMenu}>
                  Fitness Equipment
                </Link>
              </li>
            </ul>
          </li>
          <li className="NaviItem">
            <div onClick={() => toggleDropdown("automobile")}>
              Automobiles & Accessories
            </div>
            <ul
              className={`NaviDropdownMenu ${
                activeDropdown === "automobile" ? "show" : ""
              }`}
            >
              <li>
                <Link to="/automobile/vehicles" onClick={closeMobileMenu}>
                  Cars & Motorcycles
                </Link>
              </li>
              <li>
                <Link
                  to="/automobile/car-accessories"
                  onClick={closeMobileMenu}
                >
                  Car Accessories
                </Link>
              </li>
              <li>
                <Link to="/automobile/spare-parts" onClick={closeMobileMenu}>
                  Spare Parts
                </Link>
              </li>
            </ul>
          </li>
          <li className="NaviItem">
            <div onClick={() => toggleDropdown("restaurant")}>
              Food Delivery & Restaurants
            </div>
            <ul
              className={`NaviDropdownMenu ${
                activeDropdown === "restaurant" ? "show" : ""
              }`}
            >
              <li>
                <Link
                  to="/restaurant/local-restaurant"
                  onClick={closeMobileMenu}
                >
                  Local Restaurants
                </Link>
              </li>
              <li>
                <Link to="/restaurant/food-delivery" onClick={closeMobileMenu}>
                  Food Delivery Services
                </Link>
              </li>
            </ul>
          </li>
          <li className="NaviItem">
            <div onClick={() => toggleDropdown("hospitality")}>Hospitality</div>
            <ul
              className={`NaviDropdownMenu ${
                activeDropdown === "hospitality" ? "show" : ""
              }`}
            >
              <li>
                <Link to="/hospitality/hotels" onClick={closeMobileMenu}>
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/hospitality/guesthouses" onClick={closeMobileMenu}>
                  Guesthouses
                </Link>
              </li>
              <li>
                <Link
                  to="/hospitality/travel-agencies"
                  onClick={closeMobileMenu}
                >
                  Travel Agencies
                </Link>
              </li>
            </ul>
          </li>
          <li className="NaviItem">
            <div onClick={() => toggleDropdown("healthcare")}>
              Healthcare & Hospitals
            </div>
            <ul
              className={`NaviDropdownMenu ${
                activeDropdown === "healthcare" ? "show" : ""
              }`}
            >
              <li>
                <Link to="/healthcare/clinics" onClick={closeMobileMenu}>
                  Hospitals & Clinics
                </Link>
              </li>
              <li>
                <Link to="/healthcare/pharmacies" onClick={closeMobileMenu}>
                  Pharmacies
                </Link>
              </li>
              <li>
                <Link to="/healthcare/telemedicine" onClick={closeMobileMenu}>
                  Telemedicine Services
                </Link>
              </li>
            </ul>
          </li>
          <div className="userfullname">
            {isLoggedIn && (
              <div className="dropdown">
                <div className="userIcon">
                  <FaUserCircle className="profileIconNav" />
                  <div className="userIcon">
                    <Link to={`/user/profile/${userid}`}>
                      <span className="username">{user}</span>
                    </Link>
                  </div>
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
        </ul>
      </div>
    </div>
  );
};

export default Navibar;
