import React from 'react'
import profile from '../images/profile.jpg'
import phone from '../images/phone.png'
import video from '../images/video.png'
import more from '../images/more.png'

const ChatNavbar = () => {
  return (
    <div className="h-[10%] bg-slate-100  rounded-t-3xl rounded-tl-none flex justify-between w-[100%] " >
         
          <div className="mt-2 flex justify-center items-center ml-2 gap-5 w-[20%] " >
                  <img src={profile} alt='profile' className="w-9 h-9 rounded-full object-cover" />

                  <div className="text-black" >
                      <p className="font-bold text-md" >Ranjan</p>
                      <p className="font-normal text-xs" >Online</p>
                  </div>
          </div>

          <div className="flex text-black w-[40%] justify-evenly items-center">
                  <img src={phone} alt="phone" className="w-[9%] h-[40%]  rounded-full object-cover brightness-50 " />
                  <img src={video} alt="phone" className=" w-[10%] h-[43%] object-cover brightness-50 " />
                  <img src={more} alt="phone" className="w-[9%] h-[43%] object-cover brightness-50 " />
          </div>
        
    </div>
  )
}

export default ChatNavbar