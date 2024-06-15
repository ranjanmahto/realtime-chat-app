import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import SearchUser from './SearchUser'
import { useSelector } from 'react-redux';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase';


const SecondSection = () => {

  const [chats,setChats]= useState([]);
  const user = useSelector((store)=>store.user.userDetails);

  useEffect(()=>{
    // console.log("user id"+ user.id)

    const unsub = onSnapshot(doc(db, "userChats", user.id), async(docu) => {
      const items= await docu.data().chats;
      // console.log("ghusa 1" + items.length)

      const promises= items.map(async(item)=>{
        // console.log("userdocsnap")
        const userDocRef=  doc(db,"users",item.receiverId);
        const userDocSnap= await getDoc(userDocRef);
        const data= userDocSnap.data();
        
        
        return {...item,...data};

      });

      const chatData= await Promise.all(promises);
      

      setChats(chatData.sort((a,b)=>a.updatedAt- b.updatedAt));
      
      


      



      
  });

  return ()=>{
    unsub();
  }

  },[])

  
  return (

    <div className=" w-[35%] bg-slate-100 flex flex-col gap-3 rounded-l-3xl ">

                  
                    <SearchUser/>
                    <div className="w-[100%] h-[90%] px-4 my-2 overflow-y-scroll no-scrollbar " >
                      
                             
                            {chats.map((chat)=><Chat chat={chat}/>)}

                    </div>

            </div>
  )
}

export default SecondSection