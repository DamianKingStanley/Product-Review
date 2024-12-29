import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <section className="NavbarContainer">
        <ul className="NavItems">
          <li className="NavItem">
            <Link to="#">Food</Link>
            <ul className="DropdownMenu">
              <li>
                <Link to="/food/packaged-foods">Packaged Foods</Link>
              </li>
              <li>
                <Link to="/food/fresh-produce">Fresh Produce</Link>
              </li>
              <li>
                <Link to="/food/snacks">Snacks</Link>
              </li>
              <li>
                <Link to="/food/beverages">Beverages</Link>
              </li>
            </ul>
          </li>
          <li className="NavItem">
            <Link to="#">Beauty Care</Link>
            <ul className="DropdownMenu">
              <li>
                <Link to="/beauty/skin-care">Skin Care</Link>
              </li>
              <li>
                <Link to="/beauty/hair-care">Hair Care</Link>
              </li>
              <li>
                <Link to="/beauty/fragrances">Fragrances</Link>
              </li>
              <li>
                <Link to="/beauty/cosmetics">Cosmetics</Link>
              </li>
            </ul>
          </li>
          <li className="NavItem">
            <Link to="#">Gadget </Link>
            <ul className="DropdownMenu">
              <li>
                <Link to="/gadget/phones">Phones</Link>
              </li>
              <li>
                <Link to="/gadget/laptops">Laptops</Link>
              </li>
              <li>
                <Link to="/gadget/tvs">TVs</Link>
              </li>
              <li>
                <Link to="/gadget/home-appliances">Home Appliances</Link>
              </li>
              <li>
                <Link to="/gadget/wearables">
                  Wearables (Smartwatches, Fitness trackers)
                </Link>
              </li>
            </ul>
          </li>
          <li className="NavItem">
            <Link to="#">Apparel</Link>
            <ul className="DropdownMenu">
              <li>
                <Link to="/apparel/men-fashion">Men's Fashion</Link>
              </li>
              <li>
                <Link to="/apparel/women-fashion">Women's Fashion</Link>
              </li>
              <li>
                <Link to="/apparel/footwear">Footwear</Link>
              </li>
              <li>
                <Link to="/apparel/accessories">
                  Accessories (Jewelry, Watches, etc.)
                </Link>
              </li>
            </ul>
          </li>
          <li className="NavItem">
            <Link to="#">Home & Living</Link>
            <ul className="DropdownMenu">
              <li>
                <Link to="/home/furniture">Furniture</Link>
              </li>
              <li>
                <Link to="/home/kitchen-appliances">Kitchen Appliances</Link>
              </li>
              <li>
                <Link to="/home/decor-lighting">Decor & Lighting</Link>
              </li>
              <li>
                <Link to="/home/bedding">Bedding</Link>
              </li>
            </ul>
          </li>
          <li className="NavItem">
            <Link to="#"> Health</Link>
            <ul className="DropdownMenu">
              <li>
                <Link to="/health/supplements">Supplements</Link>
              </li>
              <li>
                <Link to="/health/fitness-equipment">Fitness Equipment</Link>
              </li>
            </ul>
          </li>
          <li className="NavItem">
            <Link to="#"> Automobiles</Link>
            <ul className="DropdownMenu">
              <li>
                <Link to="/automobile/vehicles">Cars & Motorcycles</Link>
              </li>
              <li>
                <Link to="/automobile/car-accessories">Car Accessories</Link>
              </li>
              <li>
                <Link to="/automobile/spare-parts">Spare Parts</Link>
              </li>
            </ul>
          </li>
          <li className="NavItem">
            <Link to="#"> Restaurants</Link>
            <ul className="DropdownMenu">
              <li>
                <Link to="/restaurant/local-restaurant">Local Restaurants</Link>
              </li>
              <li>
                <Link to="/restaurant/food-delivery">
                  Food Delivery Services
                </Link>
              </li>
            </ul>
          </li>
          <li className="NavItem">
            <Link to="#">Hospitality</Link>
            <ul className="DropdownMenu">
              <li>
                <Link to="/hospitality/hotels">Hotels</Link>
              </li>
              <li>
                <Link to="/hospitality/guesthouses">Guesthouses</Link>
              </li>
              <li>
                <Link to="/hospitality/travel-agencies">Travel Agencies</Link>
              </li>
            </ul>
          </li>
          <li className="NavItem">
            <Link to="#"> Healthcare </Link>
            <ul className="DropdownMenu">
              <li>
                <Link to="/healthcare/clinics">Hospitals & Clinics</Link>
              </li>
              <li>
                <Link to="/healthcare/pharmacies">Pharmacies</Link>
              </li>
              <li>
                <Link to="/healthcare/telemedicine">Telemedicine Services</Link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Navbar;
