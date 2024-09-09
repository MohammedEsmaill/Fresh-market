import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCartApi } from "../API's/cartAPI's";
import useMutationCart from "../Hooks/useMutationCart";
import useQueryCart from "../Hooks/useMutationCart";
import { toast } from "react-toastify";
import {
  addToWishListApi,
  deleteWishListApi,
  getWishListApi,
} from "../API's/wishListApi's";
import { useQueryCategoryProducts } from "../Hooks/useQueryCart";

export default function Item({ ele }) {
  let { status, mutate, data } = useMutationCart(addToCartApi);
  let { mutate: addwishlist, data: addedData } =
    useMutationCart(addToWishListApi);
  let { mutate: removewishlist, data: removedData } =
    useMutationCart(deleteWishListApi);
  let {
    isError,
    error,
    data: wishListData,
    isLoading,
    status: addstatus,
  } = useQueryCategoryProducts("getWishListProduct", getWishListApi);
  let [flag, setFlag] = useState(false);
  let [wishListproducts, setWishListproducts] = useState([]);

  if (status === "success") toast.success(data?.data?.message);
  if (status === "error") toast.error(data?.data?.message);


  function wishlist(id) {
    if (id == ele?._id) {
      removewishlist(ele?._id);
      console.log('removed')
    } if(id != ele?._id) {
      {
        addwishlist(ele?._id);
        console.log('added')
      }
    }
  }
  useEffect(()=>{
    setWishListproducts(wishListData)
  },[])
 
  
  return (
    <div className="sm:w1/2 md:w-1/6 rounded relative">
      <div className="product p-2 cursor-pointer">
        <div className="flex justify-end">
          <i
            onClick={() => {
              wishListproducts?.data?.data.map(((wishd)=>{
                if(wishd._id == ele._id){
                  removewishlist(ele?._id)
                  console.log('removed')
                }
                if(wishd._id != ele._id){
                  addwishlist(ele?._id)
                  console.log('add')
                }
                
    
  }))
              
            }}
            className={`fas fa-heart ${flag ? "text-green-700" : ""}`}
          ></i>
        </div>
        <Link to={`/productsDetails/${ele?._id}/${ele?.category?._id}`}>
          <img src={ele?.imageCover} className="w-full" alt="product image" />
          <p className="text-green-700">{ele?.category?.name}</p>
          <p className="line-clamp-1">{ele?.title}</p>
          <div className="flex justify-between">
            <span>{ele?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-500"></i>
              {ele?.ratingsAverage}
            </span>
          </div>
        </Link>
        <button
          onClick={() => {
            mutate(ele?._id);
          }}
          className="btn text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 px-3 py-2 rounded"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
