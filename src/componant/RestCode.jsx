import React, {  useContext, useEffect, useState } from 'react'
import { Formik, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import{useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { auth } from './AuthContext'
import { jwtDecode } from "jwt-decode";




export default function RestCode() {
  const [apierror,setapierror]=useState('')
  const [loading,setloading]=useState(false)
  const navigation= useNavigate()
  const {islogin,setlogin}=useContext(auth)

let yupSchema = Yup.object().shape({
  
  resetCode:Yup.string().matches(/^[0-9]{6}$/,'Code must be 6 Numbers').required('pleas enter the 6 number that send to your email'),

})
  
 async function restCode(values) {
  setloading(true)
 try {
  
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
  setloading(false)
  setapierror('')
  navigation('/restPassword')
  // localStorage.setItem('token',data.token)
  // setlogin( jwtDecode(data.token))
  // console.log(jwtDecode(data.token));
  

} catch (error) {
  setapierror(error?.response?.data?.message)
  setloading(false)
  console.log(error);
  
 
 }
    
  }
  let formik = useFormik({
    initialValues:{
      
      resetCode:'',
      
    },
    validationSchema:yupSchema,
    onSubmit:restCode
    
  })
 
  return (
    <div>
    
      <h2 className='font-bold text-center text-3xl mt-10'>Rest Code</h2>
      <div className="">
<form className="max-w-sm w-[90%] mx-auto " onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="resetCode" onBlur={formik.handleBlur} value={formik.values.resetCode} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-green-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Code</label>
  </div>
  {formik.errors.resetCode&& formik.touched.resetCode ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.resetCode}</span> 
</div>:''}

  <div >
  </div>
  <div >
  </div>
 <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  {loading?<i className='fas fa-spinner fa-spin'></i>:'Rest'}</button>
</form>
<p className='text-center'>Dont have account<Link className='font-bold text-green-600 underline ms-2' to='/register'>Register</Link></p>
{apierror?<div className="p-4 mb-4 mt-10 text-center w-1/4 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{apierror}</span> 
</div>:null}
      </div>
    </div>
  )
}
