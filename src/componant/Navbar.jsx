
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { NavLink, useNavigate,Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import Darkmod from '../Darkmod'
import { auth } from "./AuthContext";
import useQueryCart from "../Hooks/useQueryCart";
import { getcartapi } from "../APIS/CartApis";

import { jwtDecode } from 'jwt-decode';
const pages = ['home', 'products', 'brand','wishlist'];

function Navbar() {
  let {data}=useQueryCart('getcartapi',getcartapi)
  
  const { islogin, setlogin } = React.useContext(auth);
  const navigation= useNavigate()
  function logout() {
    localStorage.removeItem('token')
    setlogin(null)
    navigation('/login')
    
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className='dark:bg-gray-700'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography className='dark:text-white'
            variant="h5"
            noWrap
            component="a"
            href="/home"
            // change to home 
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              
              textDecoration: 'none',
            }}
          >
            
            FreshCart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
           {/* mobile menu */}
           {islogin?pages.map((page) => (
                <Link to={`/${page}`}>
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
                </Link>
              )):<Typography m={1} component='h3'variant='h6'>
                
                you need to login
                </Typography>}
              
              
            </Menu>
          </Box>
      
          <ShoppingCartIcon  sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}  />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
           FreshCart
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'  },justifyContent:'center'}}>

            {/* pc menu  */}
            
            {islogin?pages.map((page) => (
              <NavLink to={`/${page}`}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ m: 1.8, color: 'white', display: 'block'}}
                >
                {page}
              </Button>
                </NavLink>
            )):null}
          </Box>
          {islogin?<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar  alt={jwtDecode(localStorage.getItem('token'))?.name?.toUpperCase()} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={()=>{handleCloseUserMenu()}}>
               <Typography  component='h4' variant='h6'>
               <span >Hi:</span>
                <span style={{ color: 'red' }}>
                {islogin?jwtDecode(localStorage.getItem('token')).name:null}
               </span>
               </Typography>
              </MenuItem>

               <MenuItem onClick={handleCloseUserMenu}>
               <Darkmod></Darkmod>
              </MenuItem>

               <MenuItem onClick={()=>{handleCloseUserMenu();logout()}}>
               <Typography component='h5' variant='h6'>
                Logout
               </Typography>
              </MenuItem>
              
            </Menu>
            {islogin?<IconButton size="medium" aria-label="show number of items" color="inherit">
          <Badge badgeContent={data?.data?.numOfCartItems?data?.data?.numOfCartItems:null} color="error">
            <Link to={"/cart"}>
          <ShoppingBasketIcon className='dark:text-white' fontWeight="medium" />
            </Link>
          </Badge>
        </IconButton>:null}
        
          </Box>:null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
