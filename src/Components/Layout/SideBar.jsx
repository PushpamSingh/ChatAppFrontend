import { useLocation } from "react-router-dom";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {useThemeStore} from "./../../Store/useThemeStore";

export const SideBar = () => {
  const { authUserData } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const {theme}=useThemeStore()

  const authStatus=Boolean(authUserData)
  // console.log("Auth Status: ",authStatus)
  // console.log("Current path: ",currentPath)
  const navItem=[
    {
        name:"Home",
        slug:"/",
        icon:<HomeIcon className="size-5 text-base-content opacity-70" />,
        active:authStatus
    },
    {
        name:"Friends",
        slug:"/friends",
        icon: <UsersIcon className="size-5 text-base-content opacity-70" />,
        active:authStatus
    },
    {
        name:"Notification",
        slug:"/notification",
        icon:<BellIcon className="size-5 text-base-content opacity-70" />,
        active:authStatus
    },
    {
        name:"LogIn",
        slug:"/login",
        icon:<UsersIcon className="size-5 text-base-content opacity-70" />,
        active:!authStatus
    },
    {
        name:"SignUp",
        slug:"/signup",
        icon:<UsersIcon className="size-5 text-base-content opacity-70" />,
        active:!authStatus
    }
  ]
  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0" data-theme={theme}>
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
            Streamify
          </span>
        </Link>
        <nav className="flex-1 p-4 space-y-1">
          {
            navItem.map((curr)=>{
                return curr.active ?(<Link
                key={curr?.slug}
            to={curr?.slug}
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === curr.slug ? "btn-active" : ""}
            }`}
          >
            {curr.icon}
            <span>{curr.name}</span>
          </Link>):null
            })
          }
        </nav>
      </div>

         {/* USER PROFILE SECTION */}
     {authStatus && (<div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUserData?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUserData?.fullname}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>)
    }
    </aside>
  );
};
