import React, { useEffect, useRef, useState } from 'react'
import avatar from '../images/avatar.png'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';

const AddUser = () => {
    const [user,setUser]= useState(null);
    const {userDetails}= useSelector((store)=>store.user);
    const [filteredChats,setFilteredChats]= useState(null);
    


    
    const name= useRef();

    const handleOnChnage= (e)=>{
      


        if(e.target.value==="")
            {
                setFilteredChats(user);
            }
            else
            {
                const data= user.filter((u)=>u.data().name.toLowerCase().includes(e.target.value.toLowerCase()));
                setFilteredChats(data);
            }


    }

    const handleSearch= async ()=>{
        
        try{
            const userRef=  collection(db,'users');
           
            const q=query(userRef);
            
            const querySnapshot= await getDocs(q);
         
           
            

            if(!querySnapshot.empty)
                {
                   
                    setFilteredChats(querySnapshot.docs);
                   setUser(querySnapshot.docs);
                  
                   
                }
                else{

                    setUser(null);
                    
                    
                }

        }
        catch{

        }
              
        
    }

   useEffect(()=>{
    handleSearch();
   },[])

    const handleAdd= async (u)=>{

        const chatRef= collection(db,"chats");
        const userChatsRef= collection(db,"userChats");

        try{
                  const newChatref= doc(chatRef);
                  await setDoc(newChatref,{
                    createdAt:serverTimestamp(),
                    messages:[],

                  });

                  await updateDoc(doc(userChatsRef,u.id),{
                    chats:arrayUnion({
                        chatId:newChatref.id,
                        isSeen:false,
                    lastMessage:"say Hello!",
                    receiverId: userDetails.id,
                    updatedAt:Date.now(),
                    })
                    

                  })

                  await updateDoc(doc(userChatsRef,userDetails.id),{
                    chats:arrayUnion({
                        chatId:newChatref.id,
                    lastMessage:"Say Hello!",
                    receiverId: u.id,
                    updatedAt:Date.now(),
                    })
                    

                  })
        }
        catch(err)
        {

        }
    }
   

    
  return (
    <div className="absolute min-w-[20%] border border-black top-30 z-40 flex flex-col p-4 bg-blue-950 rounded-lg shadow-black shadow-lg   "    >
       <form className="flex justify-between items-baseline" onSubmit={(e)=>{
        e.preventDefault();
       }}  >  
       <input ref={name} type='text' placeholder='search  ' className='px-3 rounded-xl mb-4 h-9' onChange={handleOnChnage} />
        {/* <button  className="p-2 bg-blue-300 rounded-2xl  " onClick={(e)=>{
            e.preventDefault();
        }}  >
            Search
        </button> */}
       </form>
        {user&& <div className='flex flex-col gap-4' >
            <div className="flex  gap-3 flex-col max-h-60 overflow-x-scroll no-scrollbar " >
                
                {filteredChats.map((u)=><div className="flex justify-between my-2" >  <div className="flex gap-5" >
                    <img src={u.data()?.imgURL|| avatar} className='w-9 h-9 rounded-full'/>
                    <span className="text-white font-serif" >{u.data()?.name}</span>
                </div>


                <div class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-c1 cursor-pointer bg-blue-500 hover:bg-green-600   " onClick={()=>{
                    handleAdd(u);
                }} >
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="hover:rotate-90" >
                            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>  </div>)}


            </div>

            
        </div>}

        
    </div>
  )
}

export default AddUser