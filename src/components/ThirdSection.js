import React from 'react'
import ChatNavbar from './ChatNavbar'
import ChatMessage from './ChatMessage'

import AddUser from './AddUser'
import { useSelector } from 'react-redux'

const ThirdSection = () => {

  const showAddUser= useSelector((store)=>store.display.showAddUser);
  return (
    <div className=" w-[65%] bg-transparent   " >

                 {showAddUser && <AddUser/>}

                   <ChatNavbar/>
                   <ChatMessage/>
                
            </div>
  )
}

export default ThirdSection