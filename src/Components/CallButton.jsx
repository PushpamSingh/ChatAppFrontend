import { VideoIcon } from 'lucide-react'
import React from 'react'

export const CallButton = ({handleVideocall}) => {
  return (
     <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0">
      <button onClick={handleVideocall} className="btn btn-success btn-sm text-white">
        <VideoIcon className="size-6" />
      </button>
    </div>
  )
}


