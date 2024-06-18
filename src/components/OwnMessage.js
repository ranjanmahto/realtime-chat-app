import React, { useEffect, useRef } from 'react'

const OwnMessage = ({chat}) => {
  const endRef= useRef();
  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"});
   },[]);
  return (
    <>
   
   { chat.img&& <img className="w-56 h-40 rounded-lg self-end mx-3 " src={chat.img} />}
   {chat?.text&& <div className=" min-w-[20%] max-w-[70%] p-[1%] self-end bg-green-200 rounded-xl mx-3  mb-2  min-h-[8%]">
   
         {chat?.text && <p className="min-w-10 font-serif " >{chat?.text}</p>}
        
    </div>}
    <div ref={endRef} ></div>
    </>
  )
}

export default OwnMessage