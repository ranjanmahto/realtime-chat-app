import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const upload= async (file)=>{

    const date= new Date();

   


const storageRef = ref(storage, `Profile ${date+ file.name}`);

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
return new Promise((resolve,reject)=>{


uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
    
  }, 
  (error) => {
    // Handle unsuccessful uploads
    reject("something went wrong"+ error.message);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       resolve(downloadURL)
    });
  }
)})
};

export default upload;