import React from 'react'
import logo1 from '../assets/slider-image-1.jpeg'
import logo2 from '../assets/slider-image-2.jpeg'
import logo3 from '../assets/slider-image-3.jpeg'
import Slider from 'react-slick';
export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        arrows:false,
     
      };
 return<>
 <div className="flex justify-center flex-wrap mt-3  ">
<div className="w-[65%] ">
<Slider {...settings}>
<img src={logo1} className='w-full h-[400px]' alt="" />
<img src={logo2} className='w-full h-[400px]'  alt="" />
<img src={logo3} className='w-full h-[400px]'  alt="" />

</Slider>
</div>
<div className="w-1/3">
<img src={logo3} className='w-full h-[200px]' alt="" />
<img src={logo2} className='w-full h-[200px]' alt="" />
</div>
 </div>
 
 </>
}
