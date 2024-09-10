import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
let token = localStorage.getItem('userToken');
export function onlinePayment({ cartId, shippingAddress }) {

  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://fresh-market.vercel.app`,
    { shippingAddress },
    {
      headers: {
        token,
      },
    }
  );
}

export function cashPayment({ cartId, shippingAddress }) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    { shippingAddress },
    {
      headers: {
        token,
      },
    }
  );
}

// get user orders
export function getUserOreders(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
    {
      headers:{
        token,
      }
    }
  )
  
}