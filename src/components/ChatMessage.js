import React from 'react'
import ChatContainer from './ChatContainer'
import ChatInputBox from './ChatInputBox'

const ChatMessage = () => {
  return (
    <div className="w-[100%] h-[90%] bg-slate-200 flex flex-col justify-end relative " >

          <ChatContainer/>
          <ChatInputBox/>

    </div>
  )
}

export default ChatMessage