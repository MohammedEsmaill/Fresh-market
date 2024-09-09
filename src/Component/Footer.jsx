import React from 'react'
import logo from "../assets/finalProject assets/freshcart-logo.svg";
export default function Footer() {
  return (
    <div className='bg-main-light md:px-20 pt-8 pb-4'>
      <div className='container'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
        <div className='mb-4'><img src={logo} /></div>
        <div className='text-center'>
          <p>FOLLOW US</p>
          <div className='flex space-x-4 my-4'>
            <div className='bg-green-700 hover:bg-black hover:text-white transition-colors rounded-full w-10 h-10 flex justify-center cursor-pointer items-center'><i className="fa-brands fa-facebook-f"></i></div>
            <div className='bg-green-700 hover:bg-black hover:text-white transition-colors rounded-full w-10 h-10 flex justify-center cursor-pointer items-center'><i className="fa-brands fa-twitter"></i></div>
            <div className='bg-green-700 hover:bg-black hover:text-white transition-colors rounded-full w-10 h-10 flex justify-center cursor-pointer items-center'><i className="fa-brands fa-google"></i></div>
            <div className='bg-green-700 hover:bg-black hover:text-white transition-colors rounded-full w-10 h-10 flex justify-center cursor-pointer items-center'><i className="fa-brands fa-github"></i></div>
          </div>
        </div>
        <div className='text-center'>
          <p className='mb-3'>Legal</p>
          <p className='font-semibold'>Privacy&Policy</p>
          <p className='font-semibold'>Terms&Condition</p>
        </div>
      </div>
      <p className='text-gray-500 text-center'><span><i className="fa-regular fa-copyright"></i></span>2024<span className='text-black'> Fresh Cart  </span>All Rights Reserved</p>
    </div>
    </div>
  )
}
