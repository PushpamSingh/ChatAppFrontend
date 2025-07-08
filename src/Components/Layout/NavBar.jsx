import React from "react";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BellIcon, Hamburger, HamburgerIcon, HamIcon, LogOutIcon, MenuIcon, ShipWheelIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../../BackendService/Auth.Service";
import toast, {Toaster} from "react-hot-toast";
import {useThemeStore} from "./../../Store/useThemeStore";

import {ThemeSelector} from "./ThemeSelector"
import { useMenuClass } from "../../Store/useMenuClass";
export const NavBar = () => {
  const { authUserData } = useAuthUser();
const navigate=useNavigate()
  const authStatus = Boolean(authUserData);
  const location = useLocation();
  const isChatPage = location.pathname.startsWith("/chat");
  const queryClient=useQueryClient()
  const {theme}=useThemeStore();
  const {menuClass,setMenuClass}=useMenuClass()

  const {mutate:logOutMutation} = useMutation({
    mutationFn:async()=>{
      const response=await authService.logoutUser();
      // console.log("use logout: ",response?.data);
      return response?.data
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['authUser']})
      // navigate("/login")
  },
    onError: (error) => {
      toast.error(error?.message, {
        style: { fontSize: "16px" },
      });
    },
  })

  
  const handleBTn=()=>{
    logOutMutation()
    // console.log("data: in logout; ",authUserData);

  }


  return authStatus && (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center" data-theme={theme}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
        {/* LOGO - ONLY IN THE CHAT PAGE */}
     
          <div className="flex items-center gap-3 sm:gap-4 sm:hidden">
            <MenuIcon className="sm:hidden cursor-pointer" onClick={()=>setMenuClass(!menuClass)}/>
            <Link to="/" className={`flex items-center ${menuClass?"hidden":"block"}`}>
              <ShipWheelIcon className="size-5 text-primary" />
              <span className="text-1xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                BridgeChat
              </span>
            </Link>
          </div>
   

        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <Link to={"/notification"}>
            <button className="btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </Link>
        </div>

          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUserData?.profilePic} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>
            {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={handleBTn}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
          </div>
      </div>
      <Toaster/>
    </nav>
  );
};
