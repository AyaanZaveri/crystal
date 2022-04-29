import React from 'react'
import { CgSpinner } from 'react-icons/cg'

const Loading = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div>
          <CgSpinner className="h-8 w-8 animate-spin text-sky-500" />
        </div>
      </div>
    </div>
  )
}

export default Loading
