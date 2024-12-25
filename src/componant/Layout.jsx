import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Layout() {

  const darkTheme = createTheme({
    palette: {
      mode: "light",
     
    },
  });
 
  return (
  <> 
     <ThemeProvider theme={darkTheme}>
  <div className="parent">
    <Navbar/>
    

<div className=" container  ">
    <Outlet></Outlet>
</div>
    
<Footer></Footer>
  </div>
    </ThemeProvider>

  </>
  )
}
