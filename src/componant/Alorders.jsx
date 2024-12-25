import axios from "axios";
import useQueryCart from "../Hooks/useQueryCart";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { jwtDecode } from "jwt-decode";
import items from './Items'
import Items from "./Items";
import { Link } from "react-router-dom";
// 4242 4242 4242 4242
export default function Alorders() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading,setLoading]=useState(false)
  const [orderError,setOrderError]=useState()

  async function userOrders(id) {
   try {
    setLoading(true)
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);  
      console.log(data);
    setLoading(false)
    setUserDetails(data);
    console.log('user',userDetails);
    
   } catch (error) {
    setLoading(false)
    console.log(error.message);
    setOrderError(error.message)
    
   }
  }
  useEffect(() => {
    const userId = jwtDecode(localStorage.getItem("token"));
    console.log(userId.id);
    
    userOrders(userId.id);
  }, []);
if(loading)
  return <Loading></Loading>

  return (
    <>
    {orderError?<h2 className='text-center text-red-600'> {orderError}</h2>:<>
    <div className="flex justify-center  flex-wrap gap-3 mt-6">
    {userDetails?.map((order) => (
  <div key={order.id} className="sm:w-full md:w-1/3 xl:w-1/4 max-w-sm m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    {order?.cartItems.map((cartItem) => (
      <div key={cartItem.id}>
        <img className="rounded-t-lg" src={cartItem.product?.imageCover} alt={cartItem.product?.title} />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white   line-clamp-2">
            {cartItem.product?.title}
          </h5>
          <Link to={`/details/${cartItem.product?._id}/${cartItem.product?.category?._id}`}>
          <h4 className="py-4 hover:text-red-600 font-semibold text-lg">
            More Details...
          </h4>
          </Link>
        </div>
      </div>

    ))}
  </div>
))}

    </div>
    
    </>}
    {/* <div className="flex justify-center  flex-wrap gap-3 mt-6">
    {userDetails?.map((order) => (
  <div key={order.id} className="sm:w-full md:w-1/3 xl:w-1/4 max-w-sm m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    {order.cartItems.map((cartItem) => (
      <div key={cartItem.id}>
        <img className="rounded-t-lg" src={cartItem.product?.imageCover} alt={cartItem.product?.title} />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white   line-clamp-2">
            {cartItem.product?.title}
          </h5>
        </div>
      </div>
    ))}
  </div>
))}

    </div> */}
    </>
  );
}
