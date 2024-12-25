import axios from 'axios'
const token = localStorage.getItem('token')

export  function addtowishlist(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId},{headers:{token}})
}

export function deletewish(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:{
        token
    }})
}

export default function getwish() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers:{token}})
}

