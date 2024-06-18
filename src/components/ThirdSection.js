import React from 'react'
import ChatNavbar from './ChatNavbar'
import ChatMessage from './ChatMessage'

import AddUser from './AddUser'
import { useSelector } from 'react-redux'

const ThirdSection = () => {

 
  return (
    <div className=" w-[74%] bg-transparent border rounded-3xl rounded-b-none border-gray-600 rounded-l-none   " >

                 

                   <ChatNavbar/>
                   <ChatMessage/>
                
            </div>
  )
}

export default ThirdSection