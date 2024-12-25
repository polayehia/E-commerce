import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {  useFormik } from 'formik';
import useMutaionCart from '../Hooks/useMutaionCart'
import onlinePayment from '../APIS/Payment'
import cashPayment from '../APIS/Payment'
import { toast } from 'react-toastify';
import { getcartapi } from "../APIS/CartApis";
import useQueryCart from "../Hooks/useQueryCart";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Model({id , clear}) {
  const {data:CartApi}=useQueryCart('getcartapi',getcartapi)
    
const [flag,setflag]=React.useState(false)
  const {mutate,status,data}= useMutaionCart(onlinePayment)
  const {mutate:mutatecash,status:cashstuts,data:cashdata}= useMutaionCart(cashPayment)

  function handelpayment(shippingAddress) {
    if (flag) {
      mutate({id,shippingAddress})
      clear()
    }else{

      mutatecash({id,shippingAddress}) 
      toast(cashdata.data.status)
      clear()
      
    }
  }

  
  if (data?.data?.status=='success') 
    window.location.href= data?.data?.session?.url
    console.log('url',data?.data?.session?.url);
    

  let formik = useFormik({
    initialValues:{
      details: "",
        phone: "",
        city: "",
    },
    onSubmit:handelpayment
  })
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <>
    <div>
      {CartApi?.data?.numOfCartItems?  <div>
      <Button variant='contained' color='success' sx={{m:'30px'}} onClick={ ()=>{handleOpen();setflag(!flag)}}>Pay online</Button>
      <Button variant='contained' color='success' sx={{m:'30px'}} onClick={handleOpen}>Pay Cash</Button>

      </div>:''}
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  sx={style}>


  <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
  <div className="mb-5">
    <label htmlFor="text"className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
    <input type="text" value={formik.values.details} onChange={formik.handleChange}  id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required placeholder='enter your text'/>
  </div>
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
    <input type="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required placeholder='enter your phone'/>
  </div>
  <div className="mb-5">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
    <input type="text" id="city" value={formik.values.city} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required placeholder='enter your city'/>
  </div>
 
  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
</form>
 </Box>
  </Modal>
  </div>
 </>
  );
}
