import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Items from './Items'
import Loading from './Loading'

export default function BrandDetails() {
  const { id } = useParams()  
  const [brandDetail, setBrandDetail] = useState([]) 
  const  [loading,setLoading]=useState(false)


  const detailsBrand = async (id) => {
    setLoading(true)
    try {
      const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
      setBrandDetail(data.data)
      setLoading(false)
      console.log(data.data)
      
    } catch (error) {
        setLoading(false)
      console.log(error)

    }
  }
useEffect(()=>{
    if (id) {
        detailsBrand(id)
        
    }
},[id])
if (loading) {
    return<Loading></Loading>
}
  return (
   <>
   <div className="flex flex-wrap justify-center my-3 gap-5">
   {brandDetail.length>0? 
   brandDetail.map((ele)=><Items key={ele.id} prod={ele}></Items>)
   :<h2 className='text-center text-red-600'> NO Items For This Brand </h2>}
   </div>
   
   </>
  )
}
