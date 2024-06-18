import React, { useEffect, useRef, useState } from 'react'
import Chat from './Chat'
import SearchUser from './SearchUser'
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase';
import AddUser from './AddUser';
import { toggleShowAddUser } from '../utils/displaySlice';


const SecondSection = () => {


  const dispatch= useDispatch();
  const [chats,setChats]= useState([]);
  const searchText= useRef();
  const [filteredChats, setFilteredChats]= useState(chats);
  const user = useSelector((store)=>store.user.userDetails);
  const showAddUser= useSelector((store)=>store.display.showAddUser);
  const handleAdd= ()=>{
    dispatch(toggleShowAddUser());
}

const handleInput= ()=>{

  
  if(searchText.current.value===null)
    {
       setFilteredChats(chats);
    }
    else
    {
      const new_chats= chats.filter((c)=>c.name.toLowerCase().includes(searchText.current.value.toLowerCase()));
      setFilteredChats(new_chats)
    }
}



  useEffect(()=>{
   

    const unsub = onSnapshot(doc(db, "userChats", user.id), async(docu)=>{
      const items= await docu.data().chats;
     

      const promises= items.map(async(item)=>{
        // console.log("userdocsnap")
        const userDocRef=  doc(db,"users",item.receiverId);
        const userDocSnap= await getDoc(userDocRef);
        const data= userDocSnap.data();
        
        
        
        return {...item,...data};

      });

      const chatData= await Promise.all(promises);

      setFilteredChats(chatData.sort((a,b)=>b.updatedAt- a.updatedAt));
      

      setChats(chatData.sort((a,b)=>b.updatedAt- a.updatedAt));

      
      
      


      



      
  });

  return ()=>{

    
    return unsub();
  }

  },[])

  
  return (

    <div className=" w-[29%] bg-transparent flex flex-col gap-3 rounded-b-none rounded-l-3xl border border-gray-600    ">

                  
                          <div className="w-[100%] h-[10%] flex  justify-center items-baseline gap-[4%] " >

                              <input type='text' placeholder='search' className="mt-[6%]  h-[75%] w-[80%]  rounded-full px-[5%] outline-none border-none bg-transparent text-white " ref={searchText} onChange={handleInput} />

                              <div class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-c1 cursor-pointer bg-green-500 hover:bg-gray-600   " onClick={handleAdd}  >
                                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg" className="hover:rotate-90" >
                                          <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                              </div>


                          </div>


                    <div className="w-[100%] h-[90%] px-4 my-2 overflow-y-scroll no-scrollbar " >
                    {showAddUser && <AddUser/>}
                      
                             
                            {filteredChats.map((chat)=><Chat chat={chat}/>)}

                    </div>

            </div>
  )
}

export default SecondSection