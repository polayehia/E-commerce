

import Slider from 'react-slick';
import useQueryCart from '../Hooks/useQueryCart'
import categoriesApi from '../APIS/categories'
import Loading from './Loading'

export default function Categories() {
  
  const {data,isError,error,isLoading}=useQueryCart('categoriesApi',categoriesApi)
  if(isError)
    return<div class="p-4 w-1/4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{error}</span> 
</div>
if(isLoading)
  return <Loading></Loading>
var settings = {
  dots: true,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear"
};
  return (
  <>
  <div className=" w-[89%] mx-auto sm:w-full">
  <Slider {...settings}>
  
  {data?.data?.data?.map((ele)=><img key={ele._id} className='h-[120px] mt-8 object-cover  sm:object-contain ' src={ele?.image}></img>)}
</Slider>
  </div>
  
  </>
  )
}
