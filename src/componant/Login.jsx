import React, {  useContext, useState } from 'react'
import {  useFormik } from 'formik'
import * as Yup from 'yup'
import{useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { auth } from './AuthContext'
import { jwtDecode } from "jwt-decode";




export default function Login() {
  const [apierror,setapierror]=useState('')
  const [loading,setloading]=useState(false)
  const navigation= useNavigate()
  const {islogin,setlogin}=useContext(auth)

let yupSchema = Yup.object().shape({
  email:Yup.string().email().required('email must be valid'),
  password:Yup.string().matches(/^[A-Z][a-z]{4,8}[0-9][@!#$&*]$/,'password must start with capital letter and contain 4 or 8 small letters.one number .one of [@!#$&*] ').required('password is requird'),
})
  
 async function handelLogin(values) {
  setloading(true)
 try {
  
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
  setloading(false)
  setapierror('')
  localStorage.setItem('token',data.token)
  setlogin( jwtDecode(data.token))
  
navigation('/')

} catch (error) {
  setapierror(error?.response?.data?.message)
  setloading(false)
 
 }
    
  }
  let formik = useFormik({
    initialValues:{
      
      email:'',
      password:'',
      
    },
    validationSchema:yupSchema,
    onSubmit:handelLogin
    
  })
 
  return (
    <div>
    
      <h2 className='font-bold text-center text-3xl my-10'>Login Now</h2>
      <div className="">
<form className="max-w-sm w-[90%] mx-auto " onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-green-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">Email address</label>
  </div>
  {formik.errors.email&& formik.touched.email ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.email}</span> 
</div>:''}
  <div className="relative z-0 w-full mb-5 group">
    <input type="password"  id="password" autoComplete='' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-green-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {formik.errors.password&& formik.touched.password ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.password}</span> 
</div>:''}
  <div >
  </div>
  <div >
  </div>
 <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  {loading?<i className='fas fa-spinner fa-spin'></i>:'Submit'}</button>
</form>
<p className='text-center'>Dont have account<Link className='font-bold text-green-600 underline ms-2' to='/register'>Register</Link></p>
<p className='text-center'>Forget password<Link className='font-bold text-green-600 underline ms-2' to='/forgetPassword'>ForgetPassword</Link></p>

{apierror?<div className="p-4 mb-4 mt-10 text-center w-1/4 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{apierror}</span> 
</div>:null}
      </div>
    </div>
  )
}
