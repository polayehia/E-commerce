
import axios  from 'axios'
import { Helmet } from 'react-helmet'
import Loading from './Loading'
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ScnList from './ScnList';
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import MaleIcon from "@mui/icons-material/Male"
import FemaleIcon from "@mui/icons-material/Female"
import StoreIcon from "@mui/icons-material/Store"
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly"
import HomeIcon from "@mui/icons-material/Home"
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows"


export default function SwipeableTemporaryDrawer() {
  const [categoryArray, setcategoryArray] =React.useState([])
  const [categoryId, setCategoryId] = React.useState('')
  const [msg,setmsg]=React.useState()
  const [loading,setloading]=React.useState(false)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const icons = [
  <MusicNoteIcon fontWeight="small" />,
  <MaleIcon fontWeight="small" />,
  <FemaleIcon fontWeight="small" />,
  <StoreIcon fontWeight="small" />,
  <ChildFriendlyIcon fontWeight="small" />,
  <HomeIcon fontWeight="small" />,
  <MenuBookIcon fontWeight="small" />,
  <HealthAndSafetyIcon fontWeight="small" />,
<PhoneIphoneIcon fontWeight="small" />,
<LaptopWindowsIcon fontWeight="small" />,
]



  async function categoriesApi() {
    setmsg('')
    setloading(true)
    
    
    // api return the categoryes name 
      try {
          let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
          setcategoryArray(data?.data)
          setloading(false)
          console.log(data.data);
          
        } catch (error) {
          setmsg(error)
          console.log(error);
          
          setloading(false)
        }
      }
     
     
    
      //  api get prodact by id 
      async function getprodcatgory(id) {
        setloading(true)
        try {
         let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
         setCategoryId( data?.data)
         setloading(false)
        } catch (error) {
         setmsg(error)
        }
        }
        React.useEffect(()=>{
          categoriesApi()
          getprodcatgory()
        },[])
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
       <List>
        {categoryArray.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              
                <ListItemIcon>
                 {icons[index]}
                </ListItemIcon>              
              <ListItemText primary={text.name} onClick={()=>{getprodcatgory(text._id)}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    
    </Box>
  );
if (loading) {
  return<Loading></Loading>
}
  return (
    <>
     <Helmet>
        <title>Products</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
  
    <div>
      {[ 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button sx={{backgroundColor: 'rgb(25 133 210 / 17%)',margin:'20px'}} onClick={toggleDrawer(anchor, true)}>More Details</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
    <div className="p-4">
  <ScnList arry={categoryId}></ScnList>
</div>
    </>
  );
}
