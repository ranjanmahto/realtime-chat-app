import React from 'react'
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';

const FirstSection = () => {

  const handleSignOut= async()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="w-[6%]  bg-[#111827] rounded-l-3xl flex p-2 flex-col justify-between">

    <div className=" w-11 h-11 rounded-full bg-red-400 flex justify-center items-center mx-1 font-bold  border-green-700 border-[4px] " >
       R
    </div>

    <div className="text-white m-2 " onClick={handleSignOut}  >
          <svg stroke="currentColor" 
              fill="currentColor" 
              stroke-width="0" 
              viewBox="0 0 512 512" 
              height="30" width="30" 
              xmlns="http://www.w3.org/2000/svg"><path fill="none" 
              stroke-linecap="round" stroke-linejoin="round" 
              stroke-width="32" d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256">
                  
              </path>
          </svg>
    </div>
   

</div>
  )
}

export default FirstSection