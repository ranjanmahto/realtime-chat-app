import React, { useEffect } from 'react'

import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NoChats from './NoChats'



const ChatPage = () => {
   
  
 
  const navigate= useNavigate();

  const {chatId}= useSelector((store)=>store.chat);
  const {userDetails}=  useSelector((store)=>store.user);

  

  useEffect(()=>{
    if(!userDetails)
      {
         navigate("/");
      }
  },[])

  if(!userDetails)
    {
      return <div>
        {/* {console.log("reloding")} */}
        <h1> Redirecting to login page</h1>
      </div>
    }

  
  return (
    <div  className="w-[100%] h-[100%] bg-black flex justify-center items-center   flex-col  inset-0 -z-10   px-5  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">


        <div className="bg-gray-800 w-[80%] h-[89%] bg-opacity-45 rounded-3xl flex shadow-2xl flex-col">
                  
                  
                  <div className=" w-[100%] h-[89%] flex ">
                    <SecondSection/>
                    {chatId ? 
                      
                          
                          
                          <ThirdSection/>: <NoChats/>
                    
                    }
                  </div>
                  <FirstSection/>
            
                  
            

            

        </div>

              

    </div>
  )
}

export default ChatPage