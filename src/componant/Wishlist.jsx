import React, { useState } from 'react'
import useQueryCart from '../Hooks/useQueryCart'
import  getwish  from '../APIS/wishlist'
import { Link } from 'react-router-dom';
import Loading from './Loading'
import useMutaionCart from '../Hooks/useMutaionCart';
import { deletewish } from '../APIS/wishlist';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet'
import { addtocartapi } from '../APIS/CartApis'

export default function Wishlist() {
    const {data,isError,error,isLoading}= useQueryCart('getwish',getwish)
    console.log(data);
    
    const { mutate: addmutate, status:cartstatus } = useMutaionCart(addtocartapi);    
    const {mutate , status}=useMutaionCart(deletewish)    
    if(cartstatus==='pending')
      return <Loading></Loading>
    if(cartstatus==='success')
      toast.success('item add ')



    if (isLoading)
      return <Loading></Loading>
      if (isError)
return <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{error}</span> 
    </div>
      
if(status==='success')
  toast.success('item deleted')
if(status==='pending')
  return<Loading></Loading>
if(status==='error')
 toast.error('item did not deleted');
    
    if (!data || !data.data || !Array.isArray(data.data.data)) {
        return <div className="text-center text-red-600">No items found in the wishlist</div>;
    }
  return (
      <>
 <Helmet>
        <title>Wish</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    {data?.data?.count>0?<>
      <div className="flex flex-wrap justify-center gap-3  mt-40 ">
      {data?.data?.data?.map((wish)=><div key={wish.id}>

        <div className="w-full max-w-sm bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<Link to={`/details/${wish.id}/${wish.category._id}`}>
  <img className="p-8 rounded-t-lg" src={wish.imageCover} alt={wish.title} />
  </Link>
<div className="px-5 pb-5">
  <h2 className=' text-center  text-xl font-semibold tracking-tight text-gray-900 dark:text-green-700 mb-5  line-clamp-1'>{wish.title}</h2>
    <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">{wish.description}</p>
  
  <div className="flex items-center align-baseline justify-between mt-2.5 mb-5">
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"><i className=' m-2 fas fa-star text-yellow-600'></i>{wish.ratingsAverage}</span>
    <h4 className="font-bold text-green-600">{wish.category.name}</h4>
  </div>
  <div className="flex items-center justify-between">
  <div data-tooltip={wish.price} onClick={()=>{addmutate(wish?._id)}} className="button cursor-pointer">
  <div className="button-wrapper">
    <div className="text" >Buy Now</div>
    
    <span className="icon">
      <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
      </svg>
    </span>
  </div>
</div>

    <button onClick={() => { mutate(wish?._id) }}>
  <i className='fas fa-trash-can text-red-900 text-3xl'></i>
</button>


  </div>
</div>
 

</div>
      </div>)}

      </div>
    
    </>:<h2 className='text-center text-red-600'> NO Items IN The List </h2>}
     
    
    

    </>
    
  )
}
