import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';


const ChatInputBox = () => {

    const [EmojiClicked , setEmojiClicked]= useState(false);
    const [Message,setMessage]= useState("");
    const {chatId}= useSelector((store)=>store.chat)
    const {userDetails}= useSelector((store)=>store.user)
    const handleEmojiClicked= (e)=>{
        console.log(e);
        setMessage(Message+ e.emoji);
    }
    const handleSend= async()=>{
      if(Message==="")
        {
          return;
        }

        try{
              await updateDoc(doc(db,"chats",chatId),{
                messages:arrayUnion({
                  senderId:userDetails.id,
                  text:Message,
                  createdAt:new Date(),

                })


              });

              const UserIDs= [userDetails.id,chatId];
              UserIDs.forEach(async(id)=>{

                const userChatsRef= doc(db,"userChats",id);
                const userChatsSnapshot= await getDoc(userChatsRef);

                if(userChatsSnapshot.exists())
                  {
                    const userChatsData= userChatsSnapshot.data();

                    const chatIndex= userChatsData.chats.findIndex(
                      (c)=>c.chatId=== chatId
                    );

                    userChatsData.chats[chatIndex].lastMessage= Message;
                    userChatsData.chats[chatIndex].isSeen=  (id=== chatId?false:true);
                    userChatsData.chats[chatIndex].updatedAt= Date.now();
                    await updateDoc(userChatsRef,{
                      chats:userChatsData.chats
                    })
                  }
                  
                 
                  

              })
              
        }
        catch(err)
        {
          console.log(err)
        }
    }
  return (
    <div className=" flex justify-between items-center border border-t-gray-400 p-2   px-3 ">
             
             <div className="flex gap-5" >
                    <i class="fa-solid fa-image "></i>
                    <i class="fa-solid fa-camera"></i>
                    <i class="fa-solid fa-microphone"></i>
             </div>

             <input type='text' placeholder='Type your message' value={Message} onChange={(e)=>{
                setMessage(e.target.value);
             }}  className="bg-transparent outline-none  border-none text-black px-2 w-[70%] pb-2  "  />
             <div className="mx-3 relative " >
               <i className="fa-regular fa-face-smile cursor-pointer  mr-2 " onClick={()=>{
                setEmojiClicked(!EmojiClicked);
               }}  ></i>
               
               <div className="absolute bottom-12 right-2" >
                  <EmojiPicker open={EmojiClicked} onEmojiClick={handleEmojiClicked}   height="24rem" width="18em"/>
               </div>
               
             </div>
             <button className="rounded-xl bg-[#5183fe] px-2 py-1" onClick={handleSend} >
                Send
             </button>

    </div>
  )
}

export default ChatInputBox