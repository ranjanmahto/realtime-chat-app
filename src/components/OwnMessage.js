import React from 'react'

const OwnMessage = ({chat}) => {
  return (
    <div className=" min-w-[20%] max-w-[70%] px-[2%] self-end bg-green-200 rounded-xl mr-3 flex gap-3  min-h-[8%]" >

         <p className="min-w-10" >{chat?.text}</p>
         <span className="text-xs self-end " >1 min ago</span>
    </div>
  )
}

export default OwnMessage