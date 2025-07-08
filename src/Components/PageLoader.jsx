import React from 'react'
import {LoaderIcon} from "lucide-react"
import { useThemeStore } from '../Store/useThemeStore'
export const PageLoader = () => {
  const {theme}=useThemeStore()
  return (
    <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
        <LoaderIcon className='animate-spin size-20 text-primary'></LoaderIcon>
    </div>
  )
}


