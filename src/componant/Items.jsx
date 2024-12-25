import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addtocartapi } from '../APIS/CartApis'
import useMutaionCart from '../Hooks/useMutaionCart'
import { addtowishlist } from '../APIS/wishlist'
import { deletewish } from '../APIS/wishlist'
import { toast } from 'react-toastify'
import Loading from './Loading'

// i used chat gpt to handel the remove card form the wish wihout going to wish page and handel the local storge to keep the value even i refresh the page 
export default function Items({ prod }) {
  const { mutate: addmutate, status:cartstatus } = useMutaionCart(addtocartapi);
  const { mutate: wishmutate, data: wishdata, status: wishstatus, error } = useMutaionCart(addtowishlist);
  const { mutate: delemutate, status: delewish, error: errdele, isError } = useMutaionCart(deletewish);
  const [flag, setflag] = useState(() => {
    const savedFlag = localStorage.getItem(`wishlist-${prod._id}`);
    return savedFlag ? JSON.parse(savedFlag) : false;
  });
  
    if(cartstatus==='success')
      toast.success('item add to cart')
  useEffect(() => {
    localStorage.setItem(`wishlist-${prod._id}`, JSON.stringify(flag));
  }, [flag, prod._id]);
  
  const handleWishlistClick = () => {
    if (flag) {
      delemutate(prod._id, {
        onSuccess: () => {
          toast.success('Item removed from wishlist');
        },
        onError: (err) => {
          toast.error('Error removing item from wishlist');
          console.error(err);
        },
      });
    } else {
      wishmutate(prod._id, {
        onSuccess: () => {
          toast.success('Item added to wishlist');
        },
        onError: (err) => {
          toast.error('Error adding item to wishlist');
          console.error(err);
        },
      });
    }
    setflag(!flag);
  };
  
  if (delewish === 'pending' || wishstatus === 'pending'||cartstatus==='pending') return <Loading />;
  
 
  return (
    <>
      <div className="w-full max-w-sm mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/details/${prod.id}/${prod.category._id}`}>
          <img className="p-8 rounded-t-lg" src={prod.imageCover} alt={prod.title} />
        </Link>
        <div className="px-5 pb-5">
          <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-green-400 mb-5 line-clamp-2">
            {prod.title}
          </h2>
          <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
            {prod.description}
          </p>
          <div className="flex items-center align-baseline justify-between mt-2.5 mb-5">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              <i className="m-2 fas fa-star text-yellow-300"></i>
              {prod.ratingsAverage}
            </span>
            <h4 className="font-bold text-green-600">{prod.category.name}</h4>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{prod.price} EGP</span>
            <button
              onClick={() => {
                addmutate(prod._id);
              }}
              className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add to cart
            </button>
            <i
              onClick={handleWishlistClick}
              className={`${flag ? 'fas fa-heart text-red-600' : 'fas fa-heart-crack text-green-800'} text-2xl`}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}





