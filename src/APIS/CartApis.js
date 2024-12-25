import axios from "axios";

let baseUrl = "https://ecommerce.routemisr.com/api/v1";

let token = localStorage.getItem("token");

export function addtocartapi(productId) {
  return axios.post(
    `${baseUrl}/cart`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

export function getcartapi() {
  return axios.get(`${baseUrl}/cart`, {
    headers: {
      token,
    },
  });
}

export function deletcartapi(id) {
  return axios.delete(`${baseUrl}/cart/${id}`, { headers: { token } });
}


export function updatecartapi({id,count}) {
    return axios.put(`${baseUrl}/cart/${id}`,{count}, {
      headers: {
        token,
      },
    });
  }


  export function cleardata() {
    return axios.delete(`${baseUrl}/cart`,{headers:{token}})
  }

  export function serachItems(serchprod){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products?title=${serchprod}`)
  }