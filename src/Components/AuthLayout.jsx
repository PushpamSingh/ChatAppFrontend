import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const AuthLayOut=({children, authentication=true})=>{
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true);
    const authStatus=useSelector((state)=>state.authReducer.status);

    // console.log("Auth Status: ",authStatus);
    
    useEffect(()=>{
        //TODO: make it more easy to understand
        if(authentication && authStatus!==authentication){
            navigate("/login")
        }else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
    return loader ? <h1>Loading...</h1> : [children]
}