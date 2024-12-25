
import axios from 'axios'
import React, { useEffect } from 'react'
import {useQuery} from '@tanstack/react-query'
import Loading from './Loading'
import {Helmet} from 'react-helmet'
import { Link} from 'react-router-dom'



export default function Brand() {
  

  function brands() { 
   return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  const {error,isError,isLoading,isFetched,data}=useQuery({queryKey:['brand'],queryFn:brands})


if (isLoading) 
  return <Loading></Loading>
if (isError) 
  return<>
  <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{error.message}</span> 
</div>
  </>


  
  return (
    <>
     <Helmet>
        <title>Brand</title>
        <meta name="description" content="Helmet application" />

    </Helmet>
    <div className=" container flex justify-center gap-5 pt-5  flex-wrap">
   {data?.data?.data.map((ele)=><div key={ele._id}>
    <Link to={`/branddetails/${ele.name}/${ele._id}`}>
<div>
<img src={ele.image} alt={ele.name} className='cursor-pointer'/>
<h4 className='text-center cursor-pointer'>{ele.name}</h4>
</div>
   </Link>
   </div>)}

   </div>
  
    
    </>
  )
}
