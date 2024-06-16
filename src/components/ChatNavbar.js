import React from 'react'

import phone from '../images/phone.png'
import video from '../images/video.png'
import more from '../images/more.png'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowMoreOption } from '../utils/displaySlice'

const ChatNavbar = () => {

  const dispatch= useDispatch();
  const handleMore= ()=>{
     dispatch(toggleShowMoreOption());


  }
  

  const {user,isReceiverBlocked, isCurrentUserBlocked}= useSelector((store)=>store.chat);
  
  return (
    <div className="h-[10%] bg-slate-100  rounded-t-3xl rounded-tl-none flex justify-between w-[100%]" >
      
         
          <div className="mt-2 flex justify-center items-center ml-2 gap-5 w-[20%] " >
                  <img src={user.imgURL} alt='profile' className="w-9 h-9 rounded-full object-cover" />

                  <div className="text-black" >
                      <p className="font-bold text-md" >{(isReceiverBlocked|| isCurrentUserBlocked)?"User":user.name}</p>
                      <p className="font-normal text-xs" >{(isReceiverBlocked|| isCurrentUserBlocked)?"":"online"}</p>
                  </div>
          </div>

          <div className="flex text-black w-[40%] justify-evenly items-center relative">
                  <img src={phone} alt="phone" className="w-[9%] h-[40%]  rounded-full object-cover brightness-50 " />
                  <img src={video} alt="phone" className=" w-[10%] h-[43%] object-cover brightness-50 " />
                  <img src={more} alt="phone" className="w-[9%] h-[43%] object-cover brightness-50 cursor-pointer " onClick={handleMore} />
          </div>
        
    </div>
  )
}

export default ChatNavbar