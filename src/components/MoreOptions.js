import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase/firebase';
import { toggleBlock } from '../utils/chatSlice';
import { toggleShowMoreOption } from '../utils/displaySlice';



const MoreOptions = () => {
    const dispatch= useDispatch();

    const { user,isReceiverBlocked,isCurrentUserBlocked}= useSelector((store)=>store.chat);
    const currentUser= useSelector((store)=>store.user.userDetails);

   
   

    const handleBlock= async()=>{
      

        const userDocRef=  doc(db,'users',currentUser?.id);


        try{
          // console.log("inside try")
            await updateDoc(userDocRef,{
                blocked: isReceiverBlocked?arrayRemove(user?.id):arrayUnion(user?.id)
            });
            // console.log("after await")

            dispatch(toggleBlock());
               
             
            
        }
        catch(e)
        {

        }

    }

    
  return (
     <div className="w-[25%] bg-white absolute right-2 top-0  rounded-lg ">

        <p className='m-2 bg-white p-2 cursor-pointer hover:bg-gray-200 '  >Delete</p>
        <p  className='m-2 bg-white p-2 cursor-pointer hover:bg-gray-200 ' onClick={handleBlock}  >{(isReceiverBlocked|| isCurrentUserBlocked)?"Unblock":"Block"}</p>
        
    </div>
  )
}

export default MoreOptions