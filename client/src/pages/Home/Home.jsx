import React, { useState, useEffect } from "react";
import "./Home.css";
import TopHeader from "../../component/TopHeader/TopHeader";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import HeroSection from "../../component/HeroSection/HeroSection";
import MissionVision from "../../component/MissionVision/MissionVision";
import Posts from "../Posts/Posts";

const Home = () => {
  return (
    <div className="HomepageBody">
      <TopHeader />
      <Navbar />
      <Navibar />
      <HeroSection />
      <MissionVision />
      <Posts />
    </div>
  );
};

export default Home;
