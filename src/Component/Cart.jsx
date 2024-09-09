import React, { useContext, useEffect } from "react";
import useQueryCart, { useQueryCategoryProducts } from "../Hooks/useQueryCart";
import {
  clearCartApi,
  deleteCartApi,
  getCartApi,
  updateCartApi,
} from "../API's/cartAPI's";
import Loading from "./Loading";
import useMutationCart from "../Hooks/useMutationCart";
import cartImage from "../assets/finalProject assets/images/empty-no-item-shopping-cart-260nw-2278903521.jpg";
import BasicModal from "./Basicmodal";
export default function Cart() {
  let { mutate, isPending: delpending } = useMutationCart(deleteCartApi);
  let { isError, error, data, isLoading} = useQueryCart("getCart", getCartApi);
  let { mutate: updateMutate, isPending: uppending } =
    useMutationCart(updateCartApi);
  let { mutate: clearMutate, isPending: clpending } =
    useMutationCart(clearCartApi);
  if (isLoading) {
    return <Loading></Loading>;
  }
  if(data?.data?.cartOwner&&!isLoading){
    localStorage.setItem("cartOwner",data?.data?.cartOwner)
  }
  console.log(data?.data?.cartOwner);
  
  return (
    <>
      {data?.numOfCartItems ? (
        <div className="container md:px-20 my-3">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-around px-4">
              <h1 className="my-3 text-2xl text-black">
                Cart Items :{" "}
                <span className="font-medium text-green-700">
                  {data?.numOfCartItems}
                </span>
              </h1>
              <h1 className="my-3 text-2xl text-black">
                Cart Price :{" "}
                <span className="font-medium text-green-700">
                  {data?.data?.totalCartPrice} EGP
                </span>
              </h1>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 md:px-16 py-3">
                    <button
                      onClick={() => clearMutate()}
                      className="font-medium  bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    >
                      ClearCart
                    </button>
                  </th>
                  <th scope="col" className="md:px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="md:px-6 py-3 translate-x-7">
                    Qty
                  </th>
                  <th
                    scope="col"
                    className="-translate-x-3 md:-translate-x-0 md:px-6 py-3"
                  >
                    Price
                  </th>
                  <th scope="col" className="md:px-6 py-3">
                    Remove <i className="fas fa-trash text-red-600"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.products.map((ele) => (
                  <tr
                    key={ele?.product?._id}
                    className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={ele?.product?.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="product image"
                      />
                    </td>
                    <td className="md:px-6 py-4 font-semibold text-gray-900 dark:text-white md:w-64 md:-translate-x-2">
                      {ele?.product?.title}
                    </td>
                    <td className="md:px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            {
                              ele?.count
                                ? updateMutate({
                                    id: ele?.product?._id,
                                    count: ele?.count
                                      ? ele?.count - 1
                                      : ele?.count,
                                  })
                                : mutate(ele?.product?._id);
                            }
                          }}
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{ele?.count}</span>
                        </div>
                        <button
                          onClick={() => {
                            {
                              ele?.product?.quantity > ele.count
                                ? updateMutate({
                                    id: ele?.product?._id,
                                    count: ele?.count + 1,
                                  })
                                : updateMutate({
                                    id: ele?.product?._id,
                                    count: ele?.count,
                                  });
                            }
                          }}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {ele?.price}
                    </td>
                    <td className="md:px-6 py-4">
                      <button
                        onClick={() => mutate(ele?.product?._id)}
                        className="font-medium  bg-red-600 text-white p-2 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <BasicModal cartId={data?.data?._id}></BasicModal>
        </div>
      ) : (
        <div>
          <img className="mx-auto h-[400px]" src={cartImage} alt="empty cart" />
        </div>
      )}
    </>
  );
}
