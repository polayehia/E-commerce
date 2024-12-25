import React, { useState,useEffect } from 'react'
import Items from './Items'
import axios from 'axios'

export default function ScnList({arry}) {
    const [dataitems, setDataitems] =useState([])
    const [msg,setmsg]=useState()
    const [loading,setloading]=useState(false)
   
  async function getItems() {
  setmsg('')
  setloading(true)
    try {
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        setDataitems(data?.data)
        setloading(false)
      } catch (error) {
        console.log(error);
        setmsg(error)
        setloading(false)
      }
    }
    useEffect(()=>{
      getItems()
    },[])
  return (
    <>
    {msg?<div class="p-4 w-1/4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{msg}</span> 
</div>:''}
    {loading?
    <div className=" loader absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"></div>:''}
    <div className='flex flex-wrap justify-center mt-10 gap-5'>
      {arry?.length?arry.map((prod)=><Items prod={prod} names={prod.title} key={prod.id}></Items>):dataitems.map((prod)=><Items prod={prod} names={prod.title} key={prod.id}></Items>)}
    </div>
    
    </>
  )
}
