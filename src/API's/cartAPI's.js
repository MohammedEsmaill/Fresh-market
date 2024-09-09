import axios from "axios";

let token = localStorage.getItem("userToken");
let baseURL = `https://ecommerce.routemisr.com/api/v1`;
// add to cart
export function addToCartApi(productId) {
  return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{ productId },{
      headers: {
        token,
      }});
}
// get cart items
export function getCartApi() {
  return axios.get(`${baseURL}/cart`,
    {
      headers:{
        token ,
      }
    }
  )
}
// delete
export function deleteCartApi(id) {
  return axios.delete(`${baseURL}/cart/${id}`, {
    headers: {
      token,
    },
  });
}
// update
export function updateCartApi({id,count}) {
  return axios.put(`${baseURL}/cart/${id}`,{count},{
    headers: {
      token,
    },
  });
}
// // clear the cart
export function clearCartApi() {
  return axios.delete(`${baseURL}/cart`, {
    headers: {
      token,
    },
  });
}

// get cart orders
export function getCartOrders() {
  return axios.get(`${baseURL}/cart`,
    {
      headers:{
        token ,
      }
    }
  )
}