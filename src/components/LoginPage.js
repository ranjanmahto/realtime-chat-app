import React, { useRef, useState } from 'react'
import avatar from "../images/avatar.png"
import Notification from './Notification'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import upload from '../firebase/upload'

const LoginPage = () => {

  const [logIn,setLogIn]= useState(false);
  const [loading,setLoading]= useState(false);
  const email= useRef();
  const password= useRef();
  const name= useRef();

  const [image,setImage]= useState({
    file:"",
    url:"",
  })
  const handleProfileUpload=(e)=>{
    console.log(e);
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
        setLoading(true);
        const user= await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
        const imgURL= await upload(image.file);
        console.log(imgURL);


        

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

       }
       catch(err)
       {
         console.log(err.message);
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
  return (
    
        <div className="left w-[100%] h-[100%] bg-gradient-to-r from-purple-600 to-teal-400 flex flex-col justify-center items-center">
          <Notification/>
            

               <form className="flex flex-col justify-center items-center w-96 h-[28rem]  rounded-xl p-4" onSubmit={(e)=>{
                e.preventDefault();
               }} >
                    <p className="font-bold my-3 text-3xl text-white " >Log In Here</p>
                    <div className="flex flex-col gap-3 " >
                        {!logIn && <input ref={name} disabled={loading} type='text' placeholder='Name' className='border border-gray-500 h-12 w-80 rounded-lg p-3 ' />}
                        <input disabled={loading} ref={email} type='text' placeholder='Email' className='border border-gray-500 h-12 w-80 rounded-lg p-3 ' />
                        <input disabled={loading} ref={password} type='text' placeholder='Password' className='border border-gray-500 h-12 w-80 rounded-lg p-3 ' />
                        <label disabled={loading} htmlFor='file'>
                          <img src={image.url || avatar} className="h-8 w-8 rounded-full object-cover " />
                            Upload Image

                        </label>
                        <input disabled={loading} type='file' id='file' name='file' style={{display:"none"}} onChange={handleProfileUpload} />
                    </div>
                    <button className=" w-[10rem] h-10  rounded-lg    font-semibold text-white mx-auto my-3 bg-green-400 disabled:bg-blue-500 " onClick={handleSignIn} disabled={loading} >

                                
                       LogIn
                    </button>

                    <button onClick={()=>{
                      setLogIn(!logIn);
                    }} className="cursor-pointer disabled:bg-blue-400  " disabled={loading}  > {logIn?"Create Account":"Already a customer?Log In" }   </button>

                    


                </form>

          </div>
           
           
    
  )
}

export default LoginPage