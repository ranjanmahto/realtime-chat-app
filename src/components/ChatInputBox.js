import React, { useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import upload from '../firebase/upload';



const ChatInputBox = () => {

    const [EmojiClicked , setEmojiClicked]= useState(false);
    const [Message,setMessage]= useState("");
    const {chatId,user,isReceiverBlocked, isCurrentUserBlocked}= useSelector((store)=>store.chat)
    
    
    const {userDetails}= useSelector((store)=>store.user)
    const [media,setMedia]= useState({
      file:null,
      url:null,
    })
    useEffect(()=>{
      

    },[isReceiverBlocked])

    const handleMedia= (e)=>{
      if(e.target.files[0])
        {
          setMedia({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0]),
          })
        }
    }
    const handleEmojiClicked= (e)=>{


       
        setMessage(Message+ e.emoji);
    }
    const handleSend= async(e)=>{
      e.preventDefault();
      if(Message==="" && media.url==null)
        {
          return;
        }
        let imgURL= null;

        try
        {
          if(media.file)
            {
              imgURL= await upload(media.file);
            }
              await updateDoc(doc(db,"chats",chatId),{
                messages:arrayUnion(
                  {
                  senderId:userDetails.id,
                  text:Message,
                  createdAt:new Date(),
                  ...(imgURL && {img:imgURL})

                })


              });

             

              const UserIDs= [userDetails?.id,user?.id];
            
              UserIDs.forEach(async(id)=>{

                const userChatsRef= doc(db,"userChats",id);
                const userChatsSnapshot= await getDoc(userChatsRef);

                if(userChatsSnapshot.exists())
                  {
                    const userChatsData= userChatsSnapshot.data();

                    const chatIndex= userChatsData.chats.findIndex(
                      (c)=>c.chatId=== chatId
                    );

                    userChatsData.chats[chatIndex].lastMessage= (media.url?"Image"+(Message?Message:""):Message);
                    userChatsData.chats[chatIndex].isSeen=  (id=== user?.id?false:true);
                    userChatsData.chats[chatIndex].updatedAt= Date.now();
                    await updateDoc(userChatsRef,{
                      chats:userChatsData.chats
                    })
                  }
                  
                 
                  

              });

              setMedia({
                file:null,
                url:null,
              });
              setMessage("");

              
        }
        catch(err)
        {
          
         
        }
    }


    if(isReceiverBlocked || isCurrentUserBlocked)
      {
       
        return (
          
          <div className=" p-2  px-3 flex justify-center items-center " >

               <p className='text-lg text-gray-600' >You Can't Send any Message</p>
              
          </div>
        )
      }
     
  return (
    

    
    <form className=" flex justify-between items-center  p-2   px-3 "  onSubmit={handleSend}>
             
             <div className="flex gap-5 items-baseline" >
             <i class="fa-solid fa-camera  cursor-pointer text-white "  ></i>
             <i class="fa-solid fa-microphone cursor-pointer text-white  "></i>
                    <label htmlFor='file'>
                    <i class="fa-solid fa-image cursor-pointer text-white  "></i>
                    </label>
                   
                    
                    <input type='file' id='file' style={{display:"none"}} onChange={handleMedia} />
             </div>

             <input type='text' placeholder='Type your message' value={Message}   onChange={(e)=>{
                setMessage(e.target.value);
             }}  className="bg-transparent outline-none  border-none  px-2 w-[70%] pb-2 text-white font-serif  "  />
             <div className="mx-3 relative " >
               <i className="fa-regular fa-face-smile cursor-pointer  mr-2 text-white  " onClick={()=>{
                setEmojiClicked(!EmojiClicked);
               }}  ></i>
               
               <div className="absolute bottom-12 right-2" >
                  <EmojiPicker open={EmojiClicked} onEmojiClick={handleEmojiClicked}   height="24rem" width="18em"/>
               </div>
               
             </div>
             <button className="rounded-xl bg-[#5183fe] px-2 py-1 hover:bg-blue-400 " onClick={handleSend} >
                Send
             </button>

    </form>
  )
}

export default ChatInputBox