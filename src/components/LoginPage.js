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
  // console.log("login page start");


  
   const navigate= useNavigate();
  
  const [logIn,setLogIn]= useState(false);
  const [loading,setLoading]= useState(false);
  
  const dispatch= useDispatch();
  const {isLoading}= useSelector((store)=>store.user);
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [name,setName]= useState("");

  

  const fetchDetails= async(uid)=>{
    if(!uid)
      {
        
          return {details:null,
            loading:false
          }
         
          
      }
      else
      {

       

        
        
          
              const docRef =doc(db,"users",uid);
             
              const docSnap = await getDoc(docRef);
              
             
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
    
     if(!logIn)
      {
       try{
        
        setLoading(true);
        
        const user= await createUserWithEmailAndPassword(auth, email, password);
        const imgURL= await upload(image.file);
        
       await setDoc(doc(db,"users",user.user.uid),
       {
          name: name,
          email:email,
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
              await signInWithEmailAndPassword(auth,email,password);
              
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
      
        if(details)
          {
            navigate("/chat");
          }
        
        
       
     });

     return ()=> unsub();

     
   
     

       
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
    
        <div className="left w-[100%] h-[100%] bg-black flex flex-col justify-center  inset-0 -z-10  items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
          <Notification/>
            

               <form className="flex flex-col justify-center items-center w-96  rounded-xl p-4  " onSubmit={(e)=>{
                e.preventDefault();
               }} >
                    <p className="font-bold  text-3xl text-white mb-8 font-serif  " >{logIn?"Log In Here":" Register Now"}</p>
                    { !logIn && <><label disabled={loading} htmlFor='file' >
                        
                          <img src={image.url || profile} className="h-28 w-28 rounded-full  my-5 cursor-pointer object-cover  x-8 hover:bg-white  "  />

                         
                           

                        </label>
                        <input disabled={loading} type='file' id='file' name='file' style={{display:"none"}} onChange={handleProfileUpload} /> </>}
                    <div className="flex flex-col gap-3 outline-none " >
                        {!logIn && <input disabled={loading} type='text' placeholder='Name' className='border border-gray-500 h-12 w-80 rounded-lg p-3 outline-none ' onChange={(e)=>{
                          setName(e.target.value);
                        }} />}
                        <input disabled={loading}  type='text' placeholder='Email' className='border border-gray-500 h-12 w-80 rounded-lg p-3 outline-none '   onChange={(e)=>{
                          setEmail(e.target.value);
                        }} />
                        <input disabled={loading}  type='text' placeholder='Password' className='border border-gray-500 h-12 w-80 rounded-lg p-3 outline-none'  onChange={(e)=>{
                          setPassword(e.target.value);
                        }} />
                       
                    </div>
                    <button className=" w-[15rem] py-2  rounded-lg    font-semibold text-white  mt-5   text-lg  " onClick={handleSignIn} disabled={loading} >

                                
                                          <a href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                      <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                      <span class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                      <span class="relative text-white font-serif ">{logIn?"Log In":"Create Account"}</span>
                      </span>
                      </a>
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

{/* <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div> */}



