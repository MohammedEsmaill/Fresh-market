import React, { useEffect, useState } from "react";
import { getCategories } from "../API's/getcategories";
import FeaturedProducts from "./FeaturedProducts";
import Slider from "react-slick";
import { getProductsByCategory } from "../API's/getProducts";
import useQueryCart from "../Hooks/useQueryCart";
import useQueryCategoryProducts from "../Hooks/useQueryCart";
import Loading from "./Loading";

export default function Products() {
  let {isLoading,isError,error,data} = useQueryCart('getCategories',getCategories)
  let [catArr,setCatArr] = useState('')
  if(isLoading)
    return <Loading></Loading>
  if(isError)
    return <h1 className="text-red-700 p-2 text-center my-4 text-2xl">{error}</h1>
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 3,
          initialSlide: 0,
          dots: true,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
          dots: true,
          autoplay:true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          dots: true,
          autoplay:true
        }
      },
      
    ]
  };
  async function getData(categoryId) {
    console.log(categoryId);
    
    let categoryData = await getProductsByCategory(categoryId);
    setCatArr(categoryData?.data)
  }
  return <div>
    <div>
      <Slider {...settings} className="px-5 my-4">
        {data?.map(cat=><div key={cat} onClick={()=>getData(cat?._id)} className="text-center cursor-pointer hover:text-green-700">
        <img src={cat?.image} className="rounded-full h-[80px] object-cover w-[80px] hover:shadow-xl"/>
        <p className="-translate-x-6 md:-translate-x-6 my-3">{cat?.name}</p>
      </div>)}
      </Slider>
    </div>
    <FeaturedProducts arr={catArr} />
  </div>;
}
