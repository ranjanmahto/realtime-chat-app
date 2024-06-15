import React, { useRef, useState } from 'react'
import avatar from '../images/avatar.png'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';

const AddUser = () => {
    const [user,setUser]= useState(null);
    const {userDetails}= useSelector((store)=>store.user);

    
    const name= useRef();

    const handleSearch= async (e)=>{
        e.preventDefault();
        try{
            const userRef= collection(db,'users');
            const q=query(userRef,where("name","==",name.current.value));
            
            const querySnapshot= await getDocs(q);
            console.log(q);
            console.log(3)
            

            if(!querySnapshot.empty)
                {
                    console.log(querySnapshot.docs[0].data())
                   setUser(querySnapshot.docs[0].data());
                }
                else{

                    setUser(null);
                    console.log("hello")
                }

        }
        catch{

        }
              
        
    }

    const handleAdd= async ()=>{

        const chatRef= collection(db,"chats");
        const userChatsRef= collection(db,"userChats");

        try{
                  const newChatref= doc(chatRef);
                  await setDoc(newChatref,{
                    createdAt:serverTimestamp(),
                    messages:[],

                  });

                  await updateDoc(doc(userChatsRef,user.id),{
                    chats:arrayUnion({
                        chatId:newChatref.id,
                    lastMessage:"say Hello!",
                    receiverId: userDetails.id,
                    updatedAt:Date.now(),
                    })
                    

                  })

                  await updateDoc(doc(userChatsRef,userDetails.id),{
                    chats:arrayUnion({
                        chatId:newChatref.id,
                    lastMessage:"Say Hello!",
                    receiverId: user.id,
                    updatedAt:Date.now(),
                    })
                    

                  })
        }
        catch(err)
        {

        }
    }
  return (
    <div className="absolute min-w-[20%] border border-black top-32 z-40 flex flex-col p-4 bg-gray-700 rounded-lg shadow-black shadow-lg   "   >
       <form>
       <input ref={name} type='text' placeholder='search  ' className='px-3 rounded-xl mb-4 h-9 '  />
        <button onClick={handleSearch}>
            Search
        </button>
       </form>
        {user&& <div className='flex flex-col gap-4' >
            <div className="flex  items-center justify-between " >
                <div className="flex gap-2" >
                    <img src={user.imgURL} className='w-9 h-9 rounded-full'/>
                    <span>{user.name}</span>
                </div>


                <div class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-c1 cursor-pointer bg-blue-500 hover:bg-green-600   " onClick={handleAdd} >
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="hover:rotate-90" >
                            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>


            </div>

            
        </div>}

        
    </div>
  )
}

export default AddUser