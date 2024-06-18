import React from 'react'
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FirstSection = () => {
  const navigate= useNavigate();
  const {userDetails}= useSelector((store)=>store.user);


  const handleSignOut= async()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="w-[100%] h-[11%]   bg-[#111827]  flex p-2  justify-between px-6 items-center rounded-b-3xl ">

    <div className=" w-9 h-9 rounded-full flex justify-center items-center mx-1 font-bold gap-5 ml-10" >
        <img src={userDetails?.imgURL} className="rounded-full w-9 h-9 object-cover" />
        <p className="font-semibold text-lg text-white font-serif" >{userDetails?.name}</p>
    </div>

    <div className="text-white m-2 cursor-pointer " onClick={handleSignOut}  >
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