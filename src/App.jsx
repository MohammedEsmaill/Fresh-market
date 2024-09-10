import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  Layout from './Component/Layout';
import  Home from './Component/Home';
import  Login from './Component/Login'; 
import  Register from './Component/Register'; 
import  Brand from './Component/Brand'; 
import  Cart from './Component/Cart'; 
import  Erorr from './Component/Erorr'; 
import  ForgetPassword from './Component/ForgetPassword'; 
import  ProtectedRoute from './Component/ProtectedRoute'; 
import  ResetCode from './Component/RsetCode'; 
import  ResetPassword from './Component/ResetPassword'; 
import  ProductsDetails from './Component/ProductsDetails'; 
import  Orders from './Component/Orders'; 
import  Products from './Component/Products'; 
export default function App() {
  let rouets = createBrowserRouter([{
    path:'/Fresh-market/',element:<Layout></Layout>,children:[
      {index:true,element:<ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:'/login',element:<Login></Login>},
      {path:'/register',element:<Register></Register>},
      {path:'/reset',element:<ResetCode></ResetCode>},
      {path:'/allorders',element:<ProtectedRoute><Orders></Orders></ProtectedRoute>},
      {path:'/restPassword',element:<ResetPassword></ResetPassword>},
      {path:'/brand',element:<ProtectedRoute><Brand></Brand></ProtectedRoute>},
      {path:'/productsDetails/:id/:categoryId',element:<ProtectedRoute><ProductsDetails></ProductsDetails></ProtectedRoute>},
      {path:'/cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'/products',element:<ProtectedRoute><Products></Products></ProtectedRoute>},
      {path:'/forgetPassword',element:<ForgetPassword></ForgetPassword>},
      {path:'*',element:<Erorr></Erorr>}
    ]
  }])
  return (
    <div>
      <RouterProvider router={rouets}></RouterProvider>
    </div>
  )
}
