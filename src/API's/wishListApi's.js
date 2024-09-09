import axios from "axios";

let token = localStorage.getItem("userToken");
let baseURL = `https://ecommerce.routemisr.com/api/v1`;
// add to wishList
export function addToWishListApi(productId) {
  return axios.post(`${baseURL}/wishlist`,{ productId },{
      headers: {
        token,
      }});
}
// delete
export function deleteWishListApi(id) {
  return axios.delete(`${baseURL}/wishlist/${id}`, {
    headers: {
      token,
    },
  });
}
// get wichlist items
export function getWishListApi() {
    return axios.get(`${baseURL}/wishlist`,
      {
        headers:{
          token,
        }
      }
    )
  }