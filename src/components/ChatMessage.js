import React, { useEffect } from 'react'
import ChatContainer from './ChatContainer'
import ChatInputBox from './ChatInputBox'
import MoreOptions from './MoreOptions'
import { useSelector } from 'react-redux'



const ChatMessage = () => {
  const {showMoreOption}= useSelector((store)=>store.display)
  
 
  useEffect(()=>{

  },[showMoreOption])
 
  return (
    <div className="w-[100%] h-[90%] bg-transparent flex flex-col justify-end relative " >

           {showMoreOption && <MoreOptions/>}

          <ChatContainer/>
          <ChatInputBox/>

    </div>
  )
}

export default ChatMessage