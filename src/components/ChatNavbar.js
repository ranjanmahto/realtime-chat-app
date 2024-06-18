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
    <div className="h-[10%] bg-transparent  rounded-t-3xl rounded-tl-none flex justify-between items-center w-[100%] rounded-r-3xl border border-b-gray-600 border-t-0 border-r-0 border-l-0" > 
      
         
          <div className="mt-[0.2%] flex justify-center items-center ml-[5%] gap-5 w-[20%] h-[5%]" >
                  <img src={user.imgURL} alt='profile' className="w-[22%]  rounded-full object-cover h-[2.3rem]"/>

                  <div className="text-black w-[79%] h[100%] " >
                      <p className="font-bold text-md text-white " >{(isReceiverBlocked|| isCurrentUserBlocked)?"User":user.name}</p>
                      <p className="font-normal text-xs text-white " >{(isReceiverBlocked|| isCurrentUserBlocked)?"":"online"}</p>
                  </div>
          </div>
          
          <i class="fa-solid fa-ellipsis fa-2xl w-20 cursor-pointer text-white " onClick={handleMore} ></i>



          
                  
                  {/* <img src={more} alt="phone" className="w-[5%] h-[50%] object-cover brightness-50 cursor-pointer " onClick={handleMore} /> */}
          
        
    </div>
  )
}

export default ChatNavbar