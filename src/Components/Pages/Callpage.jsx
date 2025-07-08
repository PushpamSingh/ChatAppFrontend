import React, { useEffect, useState } from "react";
import {
  CallControls,
  CallingState,
  // CallStats,
  // name,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  // useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import chatService from "../../BackendService/Chat.service";
import toast from "react-hot-toast";
import '@stream-io/video-react-sdk/dist/css/styles.css';
const Callpage = () => {
  const {id:callId}=useParams();
  const [client,setClient]=useState(null);
  const [call ,setCall]=useState(null);
  const [isConnecting,setIsConnecting]=useState(true);
  const Stream_Api_Key=import.meta.env.VITE_STREAMING_API_KEY;

  const {authUserData,isLoading}=useAuthUser()
  const {data:TokenData}=useQuery({
    queryKey:["streamToken"],
    queryFn:async()=>{
      const response=await chatService.genStreamToken();
      return response ? response?.data : null
    },
    enabled:!!authUserData
  })

  useEffect(()=>{
   const initCall=async()=>{
       if(!(TokenData || authUserData )) return ;
    try {
     console.log("Initializing Stream Video chat....");
     const user={
      id:authUserData?._id,
      name:authUserData?.fullname,
      image:authUserData?.profilePic
     }

     const VideoClient=new StreamVideoClient({
      apiKey:Stream_Api_Key,
      user,
      token:TokenData
     })

     const callInstance=VideoClient.call("default",callId);
     await callInstance.join({create:true})
     
      setCall(callInstance)
      setClient(VideoClient)
    } catch (error) {
        toast.error(error?.message, { style: { fontSize: "16px" } });
    }finally {
        toast.success("Chat connected successfuly", {
          style: { fontSize: "16px" },
        });
        setIsConnecting(false)
      }
   }
   initCall()
  },[authUserData,TokenData,callId])
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {
          client && call ? (
              <StreamVideo client={client}>
                <StreamCall call={call}>
                    <CallContent/>
                </StreamCall>
              </StreamVideo>
          ):(
            <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
          )
        }
      </div>
    </div>
  );
};

const CallContent=()=>{
  const {useCallCallingState}=useCallStateHooks()
  const callState=useCallCallingState();
  const navigate =useNavigate();
  if(callState===CallingState.LEFT) navigate("/")
  return(
<StreamTheme>
  <SpeakerLayout/>
  <CallControls/>
</StreamTheme>
  )
}
export default Callpage;
