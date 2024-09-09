import React from "react";
import img1 from "../assets/finalProject assets/images/slider-image-1.jpeg";
import img2 from "../assets/finalProject assets/images/slider-image-2.jpeg";
import img3 from "../assets/finalProject assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:1500
      };
    
  return (
    <div className="row">
      <div className="w-2/3">
        <Slider {...settings}>
          <img className=" h-[240px] md:h-[360px] w-full" src={img1} />
          <img className=" h-[240px] md:h-[360px] w-full" src={img2} />
          <img className=" h-[240px] md:h-[360px] w-full" src={img3} />
        </Slider>
      </div>
      <div className="w-1/3">
        <img className=" h-[120px] md:h-[180px] w-full" src={img2} />
        <img className=" h-[120px] md:h-[180px] w-full" src={img3} />
      </div>
    </div>
  );
}
