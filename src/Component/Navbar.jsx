import React, { useContext, useState } from "react";
import logo from "../assets/finalProject assets/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../Context/AuthContext";
import { getCartApi } from "../API's/cartAPI's";
import useQueryCart from "../Hooks/useQueryCart";
export default function Navbar() {
  let { setLogin, isLogin } = useContext(auth);
  let navigate = useNavigate();
  let [flag, setFlag] = useState(false);
  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("cartOwner");
    setLogin(null);

  }
  let { data } = useQueryCart("getCart", getCartApi);
  "getCart", getCartApi;
  return (
    <nav className="bg-main-light py-3">
      <div className="container">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <img src={logo} alt="fresh-cart" />
            {isLogin ? (
              <ul className="font-medium hidden md:flex flex-col md:ms-3 p-4 md:p-0 mt-4 md:flex-row md:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0 ">
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={"/brand"}>Brands</NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() => setFlag(!flag)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <div className="flex items-center">
              {isLogin ? (
                <ul className="font-medium flex space-x-1 p-4 md:p-0 mt-4 md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0">
                  <li>
                    <NavLink to={"/login"} onClick={logOut}>
                      LogOut
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/cart"}>
                      <i className="fa-solid fa-cart-shopping relative text-black"></i>
                      <span className="bg-green-700 text-white rounded-full absolute px-3 py-1 -translate-y-7 -translate-x-4">
                        {data?.numOfCartItems ? data?.numOfCartItems : 0}
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    {isLogin ? (
                      <b className="text-green-700">Hi {isLogin.name}</b>
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              ) : (
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0">
                  <li>
                    <NavLink to={"/login"}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/register"}>Register</NavLink>
                  </li>
                  <li className="cursor-pointer">
                    <i className="fa-brands fa-facebook-f"></i>
                  </li>
                  <li className="cursor-pointer">
                    <i className="fa-brands fa-twitter"></i>
                  </li>
                  <li className="cursor-pointer">
                    <i className="fa-brands fa-google"></i>
                  </li>
                  <li className="cursor-pointer">
                    <i className="fa-brands fa-instagram"></i>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div>
          {isLogin && flag ?  (
            <div className="md:hidden ">
              <div className="flex items-center justify-between">
                <b className="text-green-700">Hi {isLogin.name}</b>
                <NavLink onClick={()=>setFlag(!flag)} to={"/cart"} className="mx-3">
                  <span>Cart</span>
                  <i className="fa-solid fa-cart-shopping relative text-black"></i>
                  <span className="bg-green-700 text-white rounded-full absolute px-3 py-1 -translate-y-7 -translate-x-4">
                    {data?.numOfCartItems ? data?.numOfCartItems : 0}
                  </span>
                </NavLink>
                <NavLink
                  to={"/login"}
                  onClick={logOut}
                  className="text-red-700 font-bold"
                >
                  LogOut
                </NavLink>
              </div>
              <ul className="mt-5 flex flex-col items-center justify-center">
                <li>
                  <NavLink onClick={()=>setFlag(!flag)} className="hover:text-green-700" to={"/"}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={()=>setFlag(!flag)} className="hover:text-green-700" to={"/products"}>
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={()=>setFlag(!flag)} className="hover:text-green-700" to={"/brand"}>
                    Brands
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <>
              {!isLogin && flag ?<ul className="mt-5 flex flex-col items-center justify-center">
                <li>
                    <NavLink onClick={()=>setFlag(!flag)} to={"/login"}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink onClick={()=>setFlag(!flag)} to={"/register"}>Register</NavLink>
                  </li>
              </ul>:''}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
