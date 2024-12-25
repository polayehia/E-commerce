import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { motion } from "framer-motion";
import Items from './Items';
import { addtocartapi } from '../APIS/CartApis';
import useMutaionCart from '../Hooks/useMutaionCart';
import { toast } from 'react-toastify';
export default function Details() {
const {status,mutate:adddetailsmutate,error,data}=useMutaionCart(addtocartapi)
if (status==='success')
toast.success(data?.data?.message);

   if (status==='error') 
    toast.error(error?.response?.data?.message);

  let {id,categoryId} = useParams()
  const [category,setcategory]=useState([])
  const [dataApi, setDataApi] = useState({}) 
  const [loading, setLoading] = useState(false)
  const [msg, setmsg] = useState(null)
  const [imgsrc,setimgsrc]=useState('')
  // get prod with id 
async function details(id) {
 try {
  setLoading(true)
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 setDataApi(data.data)
  setLoading(false)
 } catch (error) {
  setmsg(error)
  setLoading(false)
 }
  
  
 }
//  get prod with sam catag
async function getprodcatgory(categoryId) {
 try {
  setLoading(true)
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
 setcategory(data.data)
  setLoading(false)
 } catch (error) {
  console.log(error);
  setmsg(error)
  setLoading(false)
 }
  
  
 }

 useEffect(()=>{
   getprodcatgory(categoryId)
},[])

useEffect(()=>{
  details(id)
  
 },[id])

 function takesrc(e) {
  setimgsrc( e.target.src)
 
  
  
  
 }
return(
  <> 
    {msg?<div class="p-4 w-1/4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{msg}</span> 
</div>:''}
    {loading?
    <div className="loader absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"></div>:''}
 


<div className="flex flex-col mx-auto mt-20 items-center border border-gray-200 rounded-lg shadow md:flex-row w-2/3  bg-black ">
  <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-[50%] md:rounded-none md:rounded-s-lg"src={imgsrc?imgsrc: dataApi.imageCover} alt={dataApi.title} />
  <div className="flex flex-col justify-between p-4 leading-normal md:w-[50%]">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-500 dark:text-white">{dataApi.title}</h5>
    <p className="mb-3 font-normal text-gray-300 dark:text-white">{dataApi.description}</p>
    <ul className=' flex gap-2'>
     {dataApi?.images?.map((ele)=><li key={ele}><motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.6 }} className='rounded w-[90%]' src={ele}onClick={ takesrc}  /></li>)}
    </ul>
    <div className="flex items-center justify-between mt-5">
    <span className="text-3xl font-bold text-gray-300 dark:text-white">{dataApi.price} EGP</span>
    <button onClick={()=>{adddetailsmutate(dataApi._id)}} className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</button>
  </div>
  </div>
</div>

  <div className=" flex flex-wrap justify-center mt-10 gap-5">
    {category.map((ele)=><Items prod={ele} key={ele._id}></Items>)}
  </div>
  
  </>
)

    }



