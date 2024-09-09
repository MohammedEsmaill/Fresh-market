import React, { useEffect, useState } from "react";
import { getSpecificProduct } from "../API's/getSpecificProduct";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { getProductsByCategory } from "../API's/getProducts";
import Item from "./Item";
import { addToCartApi } from "../API's/cartAPI's";
import useMutationCart from "../Hooks/useMutationCart";
import { toast } from "react-toastify";

export default function ProductsDetails() {
  let { status, mutate ,data} = useMutationCart(addToCartApi)
  if (status === "success") 
    toast.success(data?.data?.message)
  if (status === "error") 
    toast.error(data?.data?.message)

  let [imgSrc, setImgSrc] = useState();
  let [products, setProducts] = useState([]);
  let [relatedproducts, setRelatedProducts] = useState([]);
  let [isLoading, setLoading] = useState(false);
  let [msg, setMasg] = useState("");
  let { id, categoryId } = useParams();
  async function getSpecificProductApi() {
    setLoading(true);
    let data = await getSpecificProduct(id);
    if (data?.data) {
      setProducts(data?.data);
      setMasg("");
      setLoading(false);
    } else {
      setMasg(data?.message);
      setLoading(false);
    }
  }

  ///// related products
  async function getSRelatedProductApi() {
    setLoading(true);
    let categoryData = await getProductsByCategory(categoryId);
    if (categoryData?.data) {
      setRelatedProducts(categoryData?.data);
      setMasg("");
      setLoading(false);
    } else {
      setMasg(categoryData?.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSRelatedProductApi();
  }, []);

  useEffect(() => {
    getSpecificProductApi();
  }, [id]);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (msg) {
    <h2 className="text-red-700 my-3 font-bold">{msg}</h2>;
  }
  function changeSrc(e) {
    setImgSrc(e.target.src);
  }
  return (
    <div className="row">
      <div className="md:w-1/3 px-5 pt-10 md:pt-5">
        <img
          src={imgSrc ? imgSrc : products.imageCover}
          alt="product"
          className="w-full"
        />
        <ul className="row justify-center my-3">
          {products?.images?.map((img) => (
            <li key={img} className="w-1/6 cursor-pointer">
              <motion.img
                src={img}
                alt="product"
                className="w-full p-2 hover:shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={changeSrc}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-2/3 px-5 mt-0 md:mt-40">
        <p className="text-gray-600">{products?.title}</p>
        <p className="px-2 my-2">{products?.description}</p>
        <p className="my-2">{products?.category?.name}</p>
        <div className="flex justify-between my-2">
          <span>{products?.price} EGP</span>
          <span>
            <i className="fas fa-star text-yellow-500"></i>
            {products?.ratingsAverage}
          </span>
        </div>
        <button onClick={() => {mutate(products?._id);}} className="w-full text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 px-3 py-2 rounded">
          Add to cart
        </button>
      </div>
      <h2 className="w-full my-5 text-2xl ms-5 text-green-700">
        Related Products :
      </h2>
      {relatedproducts?.map((prod) => (
        <Item key={prod?._id} ele={prod}></Item>
      ))}
      <Link to={"/"} className="top-52 md:top-24 right-6 absolute">
        <i className="fa fa-close"></i>
      </Link>
    </div>
  );
}
