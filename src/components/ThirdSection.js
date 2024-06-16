import React from 'react'
import ChatNavbar from './ChatNavbar'
import ChatMessage from './ChatMessage'

import AddUser from './AddUser'
import { useSelector } from 'react-redux'

const ThirdSection = () => {

 
  return (
    <div className=" w-[65%] bg-transparent   " >

                 

                   <ChatNavbar/>
                   <ChatMessage/>
                
            </div>
  )
}

export default ThirdSection