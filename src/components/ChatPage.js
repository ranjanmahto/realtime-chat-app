import React from 'react'

import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import bg from '../images/bg.jpg'
import { useSelector } from 'react-redux'


const ChatPage = () => {

  const {chatId}= useSelector((store)=>store.chat);
  return (
    <div  className="w-[100%] h-[100%] bg-black flex justify-center items-center   " >


        <div className="bg-gray-800 w-[70%] h-[80%] bg-opacity-45 rounded-3xl flex shadow-2xl   " >
                  
                  <FirstSection/>
                  <SecondSection/>
                  {chatId && 
                    
                         
                        
                         <ThirdSection/>
                   
                  }
            
                  
            

            

        </div>

              

    </div>
  )
}

export default ChatPage