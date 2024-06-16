import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeChat } from '../utils/chatSlice';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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
                    
                    console.log(userChatsData)

                    const chatIndex= userChatsData.chats.findIndex(
                      (c)=>c.chatId== chat.chatId
                    );
                    console.log(userChatsData.chats[chatIndex])

                   
                    userChatsData.chats[chatIndex].isSeen =true;
                   
                    await updateDoc(userChatsRef,{
                      chats:userChatsData.chats
                    })
                  }


   
      
  }

 
  return (

    <div className="flex justify-between items-center  hover:bg-slate-100 px-2 py-2 rounded-3xl hover:scale-[1.011] duration-[0.2s] hover:shadow-xl w-[100%] " onClick={handleChatClick} style={{backgroundColor:(chat?.isSeen ===false?"green":"transparent")}}  >
                                <div className="flex  items-center  " >
                                    <img src={chat.imgURL} className="w-8 h-8 rounded-full object-cover"/>
                                    <div className="flex flex-col  h-[100%] ml-4 " >
                                        <p className="font-bold text-[105%] " >{chat.name}</p>
                                        <p className="text-[80%] " >{chat.lastMessage}</p>
                                    </div>
                                </div>

                                
                                <div>
                                    3
                                </div>
       </div>
  )
}

export default Chat