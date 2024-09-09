import React, { useContext, useEffect, useState } from "react";
import useQueryCart, { useQueryCategoryProducts } from "../Hooks/useQueryCart";
import { getUserOreders } from "../API's/payment";
import { getCartApi } from "../API's/cartAPI's";
import Loading from "./Loading";
import axios from "axios";
import { data } from "autoprefixer";
export default function Orders() {
  let [isloading, setLoading] = useState(false);
  let [products, setProducts] = useState([]);
  let cartOwner = localStorage.getItem("cartOwner");
  function handleRegister(values) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
      .then(({ data }) => {
        setLoading(true);
        if (data) {
          setProducts(data)
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }
  if (isloading) return <Loading></Loading>;
  useEffect(() => {
    handleRegister();
  }, []);
  console.log(products);
  
  return (
    <div className="container">
      <div className="relative overflow-x-auto my-4 shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="text-green-700 font-bold">Hi {products[0]?.user?.name}</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="-translate-x-3 md:-translate-x-10 md:px-6 py-3">
              Payment Method
            </th>
            <th scope="col" className="-translate-x-2 md:px-6 py-3">
              Price
            </th>
            <th scope="col" className="md:px-6 py-3">
              Brand
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((ele)=><tr key={ele} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <img
                src={ele?.cartItems[0]?.product?.imageCover}
                className="w-16 md:w-32 max-w-full max-h-full"
                alt="Apple Watch"
              />
            </td>
            <td className="p-6 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {ele?.cartItems[0]?.product?.title}
            </td>
            <td className="md:px-6 py-4">
              <span>{ele?.paymentMethodType}</span>
            </td>
            <td className="md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {ele?.cartItems[0]?.price}
            </td>
            <td className="md:px-6 py-4">
              <span>{ele?.cartItems[0]?.product?.brand?.name}</span>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
    </div>
  );
}
