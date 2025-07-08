import React from 'react'
import {SideBar} from './SideBar'
import {NavBar} from './NavBar'
import { Outlet } from 'react-router-dom'
// import { useAuthUser } from '../../Hooks/useAuthUser'
import {useThemeStore} from "./../../Store/useThemeStore";

const Layout = () => {
  const {theme} = useThemeStore()
  return (
     <div className="min-h-screen" data-theme={theme}>
      <div className="flex">
      <SideBar/>
      <div className="flex-1 flex flex-col">
      <NavBar/>
      <main className="flex-1 overflow-y-auto"><Outlet/></main>
      </div>
      </div>
    </div>
  )
}

export default Layout
