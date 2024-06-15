import React, { useCallback, useState } from 'react'
import AddUser from './AddUser';
import { useDispatch } from 'react-redux';
import { toggleShowAddUser } from '../utils/displaySlice';

const SearchUser = () => {
  const dispatch= useDispatch();

  const handleAdd= ()=>{
      dispatch(toggleShowAddUser());
  }
  

  const a=5;
  return (
    <div className="w-[100%] h-[10%] flex  justify-center items-baseline gap-[4%] " >

            <input type='text' placeholder='search' className="mt-[6%] border border-gray-100 h-[75%]  rounded-full px-[5%] " />

            <div class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-c1 cursor-pointer bg-green-500 hover:bg-gray-600   " onClick={handleAdd}  >
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="hover:rotate-90" >
                        <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </div>

            
   </div>
  )
}

export default SearchUser