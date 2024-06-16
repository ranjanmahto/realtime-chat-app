import React, { useEffect, useRef } from 'react'

const FriendMessage = ({chat}) => {

  const endRef= useRef();
  useEffect(()=>{
    endRef.current?.scrollIntoView
    ({behavior:"smooth"});
   },[]);
  return (
    
      <>
   
      { chat.img&& <img className="w-56 h-40 rounded-lg self-end mx-3 " src={chat.img} />}
      { chat?.text && <div className=" min-w-[20%] max-w-[70%] px-[2%] self-start bg-white rounded-xl mr-3 flex gap-3  min-h-[8%]" >
      
      {chat?.text && <p className="min-w-10" >{chat?.text}</p>}
          
      </div>}

      <div ref={endRef} ></div>
      </>
    )
  
}

export default FriendMessage
