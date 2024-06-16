

import {useDispatch, useSelector } from 'react-redux';
import "../App.css"
import ChatPage from './ChatPage';

import LoginPage from './LoginPage';


import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { fetchUserDetails } from '../utils/userSlice';


function Body() {
  
  const {userDetails,isLoading}= useSelector((store)=>store.user);
  const dispatch= useDispatch();

  const fetchDetails= async(uid)=>{
    if(!uid)
      {
        
          return {details:null,
            loading:false
          }
         
          
      }
      else
      {
        
          
              const docRef =   doc(db, "users", uid);
              const docSnap = await getDoc(docRef);
             
              const data= docSnap.data();
             
             

              return {details:data,
                loading:false
              }
             
          
         
      }
  }

  

   useEffect(()=>{
    const unsub=  onAuthStateChanged(auth,async(user)=>{
   
     
        const {details,loading}= await fetchDetails(user?.uid);
       

        dispatch(fetchUserDetails({details,loading}));
        
       
     })

     return ()=>{
      unsub();
     }

    

      
   },[])

   if(isLoading)
    {
      return (
      <div className="text-3xl font-bold bg-gray-400 h-[100vh] w-[100vw] text-center z-50 text-black flex justify-center items-center" >

      


        Loading....
      </div>)
    }

  

  return (
    <div className="w-[100%] h-[100%]">

       

        
        

       

          {userDetails?<ChatPage/>: <LoginPage/> }
               
        

           
    </div>
  );
}

export default Body;
