import React, { useState,useEffect } from 'react'
import Items from './Items'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button } from '@mui/material';

  // export default function List({arry}) {
  export default function List({arry}) {
    const [searchTerm, setSearchTerm] = useState('');
console.log('serch',searchTerm);

  // -----------------------------------
    const [dataitems, setDataitems] =useState([])
    const [msg,setmsg]=useState()
    const [loading,setloading]=useState(false)
  async function getItems() {
  setmsg('')
  setloading(true)
    try {
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        setDataitems(data?.data)
        setloading(false)
      } catch (error) {
        console.log(error);
        setmsg(error)
        setloading(false)
      }
    }
    useEffect(()=>{
      getItems()
    },[])

const handelchange=(e,value)=>{
  console.log('what did user pick ',e.target.value||value);
  searchProd(value)
}
async function searchProd(search) {
  try {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?title=${search}`
    );
    console.log(data.data);      
    setSearchTerm(data.data)
  } catch (error) {
    console.log(error);
  }
}
    return (
      <>
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',mt:5}} component={'div'}>
  <Stack  sx={{ width: '90%' }}>  
<Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        
        options={dataitems.map((option) => option.title )}
        onChange={handelchange}
        // value={searchTerm}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search product..."
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
          />
        )}
      />
    <Button variant="outlined" size="medium" sx={{mt:1}} onClick={()=>{setSearchTerm('');getItems()}}>
          Get all Prodact
        </Button>
      
    </Stack>
        </Box>
      {msg?<div class="p-4 w-1/4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span class="font-medium">{msg}</span> 
  </div>:''}
      {loading?
      <div className=" loader absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"></div>:''}
      <div className='flex flex-wrap justify-center mt-10 gap-5'>
        {searchTerm?searchTerm.map((prod)=><Items prod={prod} names={prod.title} key={prod.id}></Items>):dataitems.map((prod)=><Items prod={prod} names={prod.title} key={prod.id}></Items>)}
      </div>
      
      </>
    )
  }
