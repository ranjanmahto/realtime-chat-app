import React, { useEffect, useRef, useState } from 'react'

import Notification from './Notification'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import upload from '../firebase/upload'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../utils/userSlice'
import profile from "../images/profile.jpg"
import ReactLoading from 'react-loading';



const LoginPage = () => {
  console.log("login page start")


  
   const navigate= useNavigate();
  
  const [logIn,setLogIn]= useState(false);
  const [loading,setLoading]= useState(false);
  const email= useRef();
  const password= useRef();
  const name= useRef();
  const dispatch= useDispatch();
  const {userDetails,isLoading}= useSelector((store)=>store.user);

  const fetchDetails= async(uid)=>{
    if(!uid)
      {
        
          return {details:null,
            loading:false
          }
         
          
      }
      else
      {

        console.log("uid present");

        
        
          
              const docRef =doc(db, "users", uid);
             
              const docSnap = await getDoc(docRef);
              console.log(docSnap.data());
             
              const data= docSnap.data();
             
             

              return {details:data,
                loading:false
              }
             
          
         
      }
  }


  const [image,setImage]= useState({
    file:"",
    url:"",
  })
  const handleProfileUpload=(e)=>{
   
    if(e.target.files[0])
      {
             setImage({
              file: e.target.files[0],
              url: URL.createObjectURL(e.target.files[0])
             })
      }

  }

  const handleSignIn= async (e)=>{
    e.preventDefault();
     if(!logIn)
      {
       try{
        console.log(
          "create account"
        )
        setLoading(true);
        const user= await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
        const imgURL= await upload(image.file);
       


        

       await setDoc(doc(db,"users",user.user.uid),
       {
          name: name.current.value,
          email:email.current.value,
          imgURL:imgURL,
          id: user.user.uid,
          blocked:[],

        });
      await  setDoc(doc(db,'userChats',user.user.uid),{
          chats:[],
        })
        
        toast.success("Account created successfully");
        
        navigate("/chat");

       }
       catch(err)
       {
        
         toast.error(err.message);
       }
       finally{
        setLoading(false);
       }

        
      }
      else
      {
             try{
              setLoading(true);
              await signInWithEmailAndPassword(auth,email.current.value,password.current.value);
              
              toast.success("Login Successfully");
          
              navigate("/chat");


              
              
              
             }
             catch(err)
             {

             
             
              toast.error(err.message);
             }
             finally{
              setLoading(false);
              // setLogIn(false);
             }
      }

    
  }
  useEffect(()=>{
    const unsub= onAuthStateChanged(auth,async(user)=>
      {
   
     
        const {details,loading}= await fetchDetails(user?.uid);
       

        dispatch(fetchUserDetails({details,loading}));
        console.log("details");
        console.log(details)
        if(user)
          {
            navigate("/chat");
          }
        
        
       
     })

     
   
     

       
   },[])
      
   
     
      
      
  
   if(isLoading)
    {
      return (
        <div className="w-full h-full flex items-center justify-center" >
          <ReactLoading type='spin' color='gray' width={'10%'} height={'5%'} />
        </div>
      )
    }


  


  return (
    <>
    
        <div className="left w-[100%] h-[100%] bg-[#111827] flex flex-col justify-center items-center">
          <Notification/>
            

               <form className="flex flex-col justify-center items-center w-96  rounded-xl p-4  " onSubmit={(e)=>{
                e.preventDefault();
               }} >
                    <p className="font-bold  text-3xl text-white mb-8  " >{logIn?"Log In Here":" Register Now"}</p>
                    { !logIn && <><label disabled={loading} htmlFor='file' >
                        
                          <img src={image.url || profile} className="h-28 w-28 rounded-full  my-5 cursor-pointer object-cover  x-8 hover:bg-white  "  />

                         
                           

                        </label>
                        <input disabled={loading} type='file' id='file' name='file' style={{display:"none"}} onChange={handleProfileUpload} /> </>}
                    <div className="flex flex-col gap-3 " >
                        {!logIn && <input ref={name} disabled={loading} type='text' placeholder='Name' className='border border-gray-500 h-12 w-80 rounded-lg p-3 ' />}
                        <input disabled={loading} ref={email} type='text' placeholder='Email' className='border border-gray-500 h-12 w-80 rounded-lg p-3 ' />
                        <input disabled={loading} ref={password} type='text' placeholder='Password' className='border border-gray-500 h-12 w-80 rounded-lg p-3 ' />
                       
                    </div>
                    <button className=" w-[15rem] py-2  rounded-lg    font-semibold text-white  mt-5  bg-green-400 text-lg disabled:bg-blue-500 " onClick={handleSignIn} disabled={loading} >

                                
                     {logIn?"LogIn":"Create Account"}
                    </button>

                    <button onClick={()=>{
                      setLogIn(!logIn);
                    }} className="cursor-pointer disabled:bg-blue-400 text-white font-extralight text-lg m-3 " disabled={loading}  > {logIn?"Don't have an account?Create Account ":"Already a customer?Log In" }   </button>

                    


                </form>

          </div>

          </>
           
           
    
  )
}

export default LoginPage