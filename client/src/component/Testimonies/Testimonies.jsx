import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonies.css";
import bookshop1 from "../../assest/bookshop1.avif";
import bookshop2 from "../../assest/bookshop2.webp";
import bookshop3 from "../../assest/bookshop3.webp";

const testimonies = [
  {
    name: "— Aristotle",
    testimony: "The roots of education are bitter, but the fruit is sweet.",
    image: bookshop1,
  },
  {
    name: "— William Butler Yeats",
    testimony:
      "Education is not the filling of a pail, but the lighting of a fire.",
    image: bookshop2,
  },
  {
    name: "— Malcolm Forbes",
    testimony:
      "The purpose of education is to replace an empty mind with an open one.",
    image: bookshop3,
  },
];

const Testimonies = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="testimoniesSection">
      <Slider {...settings}>
        {testimonies.map((testimony, index) => (
          <div key={index} className="testimony">
            <img src={testimony.image} alt={`${testimony.name}`} />
            <p className="testimonyText">"{testimony.testimony}"</p>
            <p className="testimonyName">- {testimony.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonies;
