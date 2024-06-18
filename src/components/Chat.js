import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeChat } from '../utils/chatSlice';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import avatar from "../images/avatar.png"

const Chat = ({chat}) => {

  const currentUser= useSelector((store)=>store.user.userDetails);
  const dispatch= useDispatch();
  const {chatId}= useSelector((store)=>store.chat);


  const handleChatClick= async()=>{

     dispatch(changeChat({chatId:chat.chatId,user:chat,currentUser:currentUser}));
     const userChatsRef= doc(db,"userChats",currentUser?.id);
                const userChatsSnapshot= await getDoc(userChatsRef);

                if(userChatsSnapshot.exists())
                  {
                    const userChatsData= userChatsSnapshot.data();
                    
                    

                    const chatIndex= userChatsData.chats.findIndex(
                      (c)=>c.chatId== chat.chatId
                    );
                    

                   
                    userChatsData.chats[chatIndex].isSeen =true;
                   
                    await updateDoc(userChatsRef,{
                      chats:userChatsData.chats
                    })
                  }


   
      
  }

 

 
  return (

    <div className="flex justify-between items-center  hover:bg-slate-100 px-2 py-2 rounded-xl  hover:scale-[1.011] duration-[0.2s] hover:shadow-xl w-[100%] z-40 cursor-pointer " onClick={handleChatClick} style={{backgroundColor:(chat?.isSeen ===false?"green":"transparent")}}  >
                                <div className="flex  items-center  " >

                                    <img src={chat?.imgURL|| avatar } className="w-8 h-8 rounded-full object-cover"/>
                                    <div className="flex flex-col  h-[100%] ml-4 " >
                                        <p className="font-bold  text-white font-serif " >{chat.name}</p>
                                        <p className="text-[80%] text-white font-sans " >{chat.lastMessage}</p>
                                    </div>
                                </div>

                                
                                <div>
                                    3
                                </div>
       </div>
  )
}

export default Chat




