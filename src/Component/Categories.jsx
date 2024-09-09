import React, { useEffect, useState } from "react";
import { getCategories } from "../API's/getcategories";
import Slider from "react-slick";
import useQueryCart from "../Hooks/useQueryCart";
export default function Categories() {
  let {isLoading,isError,error,data} = useQueryCart('getCategoriesApi',getCategories)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay:true,
    autoplaySpeed:1500,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="my-5">
      <Slider {...settings}>
        {data?.map(ele=><img className="h-[200px] object-cover" src={ele?.image} key={ele?._id} />)}
      </Slider>
    </div>
  )
}
