import toast, {Toaster} from "react-hot-toast"
import { createBrowserRouter, HashRouter, Navigate, Outlet, Route, RouterProvider, Routes, useNavigate } from "react-router-dom";
// import Header from "./Components/Layout/Header";
// import Footer from "./Components/Layout/Footer";
import Homepage from "./Components/Pages/Homepage";
import Loginpage from "./Components/Pages/Loginpage";
import Signuppage from "./Components/Pages/Signuppage";
import Onboardingpage from "./Components/Pages/Onboardingpage";
import Notificationpage from "./Components/Pages/Notificationpage";
import Callpage from "./Components/Pages/Callpage";
import Chatpage from "./Components/Pages/Chatpage";
import Layout from "./Components/Layout/Layout";
import { useAuthUser } from "./Hooks/useAuthUser";
import { PageLoader } from "./Components/PageLoader";
function App() {
  // const navigate=useNavigate();
  // const dispatch=useDispatch();
  
 const {authUserData,isLoading}=useAuthUser()
const isAuthenticated=Boolean(authUserData);
const isOnBoarded=authUserData?.isOnboarded

// console.log("AuthUser: ",authUserData);

// const router=createBrowserRouter([
//   {
//     path:"/",
//     element:<Layout/>,
//     children:[
//       {
//         path:'/',
//         element:(
//           isAuthenticated && isOnBoarded?
//           (<Homepage/>)
//           :<Navigate to={!isAuthenticated?"/login":"/onboarding"}/>
//         )
//       },
//       {
//         path:'/notification',
//         element:(
//             isAuthenticated && isOnBoarded?
//             <Notificationpage/>
//             :<Navigate to={!isAuthenticated? "/login" : "/onboarding"}/>
//         )
//       },
//       {
//         path:'/call/:id',
//         element:(
//             isAuthenticated && isOnBoarded?
//             <Callpage/>
//             :<Navigate to="/login"/>
//         )
//       },
//       {
//         path:'/chat/:id',
//         element:(
//             isAuthenticated && isOnBoarded?
//             <Chatpage/>
//             :<Navigate to="/login"/>
//         )
//       }
//     ]
//   },
//    {
//         path:'/login',
//         element:(
//             !isAuthenticated?
//             <Loginpage/>
//             :<Navigate to={!isOnBoarded?"/onboarding":"/"}/>
//         )
//       },
//       {
//         path:'/signup',
//         element:(
//             !isAuthenticated?
//             <Signuppage/>
//             :<Navigate to={!isOnBoarded?"/onboarding":"/"}/>
//         )
//       },
//       {
//         path:'/onboarding',
//         element:(
//             isAuthenticated?(
//               !isOnBoarded?(
//                 <Onboardingpage/>
//               ):(<Navigate to="/"/>)
//           )
//             :<Navigate to="/login"/>
//         )
//       },
// ])

if(isLoading) return <PageLoader/>

  return (
    <HashRouter>
   
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route
            path="/"
            element={
              isAuthenticated && isOnBoarded ? (
                    <Homepage />
                  
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/notification"
            element={
              isAuthenticated && isOnBoarded ? (
      
                <Notificationpage />
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/call/:id"
            element={
              isAuthenticated && isOnBoarded ? <Callpage /> : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && isOnBoarded ? <Chatpage />: <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            }
          />

          </Route>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Loginpage />
              ) : (
                <Navigate to={!isOnBoarded ? "/onboarding" : "/"} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <Signuppage />
              ) : (
                <Navigate to={!isOnBoarded ? "/onboarding" : "/"} />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !isOnBoarded ? <Onboardingpage /> : <Navigate to="/" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      <Toaster />
    </HashRouter>
    
  )
  
}

export default App;
