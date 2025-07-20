// src/components/Banner.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className="banner">
      <Slider {...settings}>
        <div>
          <img 
            src="https://ik.imagekit.io/tvlk/image/imageResource/2024/09/09/1725851891803-f3c888664c5d10ee45d31cbfac375c2c.jpeg?tr=q-7"
            alt="Hotel Booking Banner 1"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <img 
            src="https://ik.imagekit.io/tvlk/image/imageResource/2024/09/09/1725851891803-f3c888664c5d10ee45d31cbfac375c2c.jpeg?tr=q-75"
            alt="Hotel Booking Banner 2"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <img 
            src="https://ik.imagekit.io/tvlk/image/imageResource/2024/09/09/1725851891803-f3c888664c5d10ee45d31cbfac375c2c.jpeg?tr=q-75"
            alt="Hotel Booking Banner 3"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
