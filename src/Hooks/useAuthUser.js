import React from 'react'
import authService from '../BackendService/Auth.Service';
import { useQuery } from '@tanstack/react-query';

export const useAuthUser = () => {
   const authuser=useQuery({
    queryKey:["authUser"],
    queryFn:async()=>{
        const res = await authService.getUserDetails();
        // console.log("Response: ",res);
        if(res){
          return res?.data
        }else{
          return res;
        }
        
    },
    retry:false,
  })

  return {authUserData: authuser.data,isLoading: authuser.isLoading, refetchAuthUser: authuser.refetch}
 
}

