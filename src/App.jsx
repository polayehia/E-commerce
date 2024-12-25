
import './App.css'
import {createBrowserRouter,createHashRouter,RouterProvider} from 'react-router-dom'
import Layout from './componant/Layout'
import Cart from './componant/Cart'
import Login from './componant/Login'
import Register from './componant/Register'
import Notfound from './componant/Notfound'
import ProtectedRoute from './componant/ProtectedRoute'
import ForgetPassword from './componant/ForgetPassword'
import RestCode from './componant/RestCode'
import RestPassword from './componant/RestPassword'
import Details from './componant/Details'
import Alorders from './componant/Alorders'
import 'flowbite';
import BrandDetails from './componant/BrandDetails'
import { lazy, Suspense } from 'react';
import Loading from './componant/Loading'

const Home = lazy(() => import('./componant/Home'));
const Brand = lazy(() => import('./componant/Brand'));

const Wishlist = lazy(() => import('./componant/Wishlist'));
const Products = lazy(() => import('./componant/Products'));


 function App() {
let router = createHashRouter([{
// let router = createBrowserRouter([{
  path: '/',element:<Layout></Layout>,children:[
    {path:'/brand',element:<ProtectedRoute><Suspense fallback={<Loading></Loading>}><Brand/></Suspense></ProtectedRoute>},
    {path:'/cart',element: <ProtectedRoute><Cart></Cart></ProtectedRoute>},
    {index:true,element:<ProtectedRoute><Home></Home></ProtectedRoute>},
    {path:'/home',element:<ProtectedRoute><Suspense fallback={<Loading></Loading>}><Home/></Suspense></ProtectedRoute>},
    {path:'/login',element:<Login></Login>},
    {path:'/forgetPassword',element:<ForgetPassword></ForgetPassword>},
    {path:'/restCode',element:<RestCode></RestCode>},
    {path:'/restPassword',element:<RestPassword></RestPassword>},
    {path:'/products',element:<ProtectedRoute><Suspense fallback={<Loading></Loading>}><Products/></Suspense></ProtectedRoute>}, 
    {path:'/allorders',element:<ProtectedRoute><Alorders></Alorders></ProtectedRoute>},
    {path:'/wishlist',element:<ProtectedRoute><Suspense fallback={<Loading></Loading>}><Wishlist></Wishlist></Suspense></ProtectedRoute>},
    {path:'/register',element:<Register></Register>},
    {path:'/branddetails/:brandname/:id',element:<BrandDetails></BrandDetails>},
    {path:'/details/:id/:categoryId',element:<ProtectedRoute><Details></Details></ProtectedRoute>},
    {path:'*',element:<Notfound></Notfound>},
    
    
  ]
}])
  return (
    <>
    <RouterProvider router={router}> </RouterProvider>
 
    </>
  )
}

export default App
