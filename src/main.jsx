import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'flowbite';
import '@fortawesome/fontawesome-free/css/all.min.css'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './index.css'
import { AuthcontextProvider } from './componant/AuthContext.jsx'
import { jwtDecode } from "jwt-decode";
import {QueryClientProvider , QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
 <AuthcontextProvider>
<ToastContainer position="bottom-left"
autoClose={1500}></ToastContainer>
  <App></App>
</AuthcontextProvider>
<ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  

)
