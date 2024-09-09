import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { auth } from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
export default function Login() {
  let {setLogin,isLogin} = useContext(auth)
  let [loading,setLoading] = useState(false);
  let [msg,setMsg] = useState('')
  let navigate = useNavigate()
  function handleLogin(values) {
    setLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then(
      ({data})=>{
        if(data.message === 'success'){
          setMsg('');
          setLoading(false)
          localStorage.setItem("userToken", data.token);
          navigate('/')
          setLogin(jwtDecode(data.token));
          
        }
      }
    ).catch(
      (err)=>{setMsg(err?.response?.data?.message),setLoading(false)}
    )
  }
  let validationSchema = Yup.object({
    email:Yup.string().email().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
    password:Yup.string().min(8,'Password must be at least 8 digit').matches(/^[A-Za-z0-9]{8,}$/).required(),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin
  });
  return (
    <div className="container">
      <h2 className="font-light my-3 md:ms-20 text-2xl">Login Now :</h2>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        {msg?<div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{msg}</span>
        </div>:''}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            UserEmail
          </label>
        </div>
        {formik.touched.email && formik.errors.email?<div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{formik.errors.email}</span>
        </div>:''}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.touched.password && formik.errors.password?<div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{formik.errors.password}</span>
        </div>:''}
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-green-700 dark:focus:ring-green-700"
        >{loading?<i className="fa-solid fa-spinner fa-spin me-3"></i>:''}
          Login
        </button>
        <div className="flex flex-col my-10 justify-between items-center">
        <p><Link to={'/forgetPassword'} className="text-green-700 underline hover:text-green-700 hover:underline font-semibold">Forget Password</Link></p>
        <p>Or</p>
        <p>Don't have account  <Link to={'/register'} className="text-green-700 underline hover:text-green-700 hover:underline font-semibold ms-2">Register Now</Link></p>
        
        </div>
      </form>
      
    </div>
  );
}
