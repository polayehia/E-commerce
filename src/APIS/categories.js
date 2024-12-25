import axios from "axios";

export default function categoriesApi() {
return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
