import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { date } from "yup";

export let auth = createContext(null)
export  function AuthcontextProvider({children}) {
    let [islogin,setlogin]=useState(null)
    // to handl refrech
    useEffect(()=>{
        if (localStorage.getItem('token')) {
            setlogin(jwtDecode(localStorage.getItem('token')))
        }
    },[])
    return<auth.Provider value={{islogin,setlogin}}>
        {children}
    </auth.Provider>
}
