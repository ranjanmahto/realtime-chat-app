import React, { useEffect, useRef, useState } from 'react'
import OwnMessage from './OwnMessage'
import FriendMessage from './FriendMessage';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';


const ChatContainer = () => {
  

   
   const [chat,setChat]= useState();
   const currentUser= useSelector((store)=>store.user.userDetails);
   
   const {chatId,user,isReceiverBlocked, isCurrentUserBlocked}= useSelector((store)=>store.chat);
   

   useEffect(()=>{
    

    const unsub= onSnapshot(doc(db,"chats",chatId),(res)=>{
      setChat(res.data());
    })
   
     return ()=>{
      unsub();
     }
   },[chat])
   
  return (
    <div className="flex flex-col gap-1 overflow-y-scroll no-scrollbar ">
    
    
      

      {chat?.messages.map((chat)=>
      <>
        
          {chat.senderId== currentUser.id?<OwnMessage chat={chat}/>:<FriendMessage chat={chat}/>}
          
          
       </>


      )}
      

      
       
      
      
       
    </div>
  )
}

export default ChatContainer