import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroSection.css";
import slide1 from "../../assets/heroSlide1.jpg";
import slide2 from "../../assets/heroslide2.jpg";
import slide3 from "../../assets/heroSlide3.jpg";
import slide4 from "../../assets/slideHero4.jpeg";
import slide5 from "../../assets/heroSlide5.jpg";

const heroAdvert = [
  {
    name: "— Slide 1/5",
    testimony:
      "Are you about to try a product or a service for the first time?",
    image: slide2,
  },
  {
    name: "— Slide 2/5",
    testimony: "Find out what other customers who have used them are saying!",
    image: slide1,
  },
  {
    name: "— Slide 3/5",
    testimony:
      "Before you pay for that product or that service, check out others' reviews so you don't waste your money!",
    image: slide3,
  },
  {
    name: "—Slide 4/5",
    testimony:
      "Our Mission is simple- To help customers know a good product to buy and the ones to avoid. With this, producers and business owners will start doing the right time.",
    image: slide4,
  },
  {
    name: "— Slide 5/5",
    testimony: "Save a customer today. Share reviews of products with us!",
    image: slide5,
  },
];

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500, // Adjust the fade speed (higher value slows it down)
    fade: true, // Enable fade transition
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Control how long each slide stays before transition
    cssEase: "linear", // Smooth transition
  };

  return (
    <div className="HeroSectionBody">
      <div className="testimoniesSection">
        <Slider {...settings}>
          {heroAdvert.map((testimony, index) => (
            <div key={index} className="testimony">
              <img src={testimony.image} alt={`${testimony.name}`} />
              <p className="testimonyText">"{testimony.testimony}"</p>
              <p className="testimonyName">- {testimony.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HeroSection;
