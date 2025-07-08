import React from 'react'
import { LoaderIcon } from 'react-hot-toast'

export const ChatLoader = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center p-4'>
        <LoaderIcon className='animate-spin size-10 text-primary'/>
      <span className='text-lg mt-4 font-mono text-center'>Connecting to Chat....</span>
    </div>
  )
}


