import { createSlice } from "@reduxjs/toolkit";


const userSlice= createSlice({
    name:"user",
    initialState:{
        userDetails:null,
        isLoading:true,
       
        
    },
    reducers:{
        fetchUserDetails:(state,action)=>
        {
           
           const {details,loading}= action.payload;
           
          
          
           state.userDetails= details;
           
           state.isLoading= loading;

         
                
        }
    }
});

export const {fetchUserDetails}= userSlice.actions;
export default userSlice.reducer;