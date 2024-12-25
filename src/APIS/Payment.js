import axios from "axios";

const token = localStorage.getItem('token')

 export default  function onlinePayment({id,shippingAddress}) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,{shippingAddress},{headers:{
        token
    }})
}


export function cashPayment({id,shippingAddress}) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,{shippingAddress},{headers:{token}}

    )

}

export function userorders() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17`)
}