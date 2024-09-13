import { createSlice } from "@reduxjs/toolkit";


const chatSlice= createSlice({
    name:"chat",
    initialState:{
        chatId:null,
        user:null,
        isCurrentUserBlocked:false,
        isReceiverBlocked:false,

    },
    reducers:{
        changeChat:(state,action)=>{
            

            const {chatId,user,currentUser}= action.payload;

          
                       
                    
            
            if((user?.blocked.includes(currentUser?.id)))
                {
                    // console.log("Blocked")
                    state.chatId= chatId;
                       state.user= user;
                    
                    state.isCurrentUserBlocked= true;
                    state.isReceiverBlocked= false;


                }

               else if((currentUser?.blocked.includes(user?.id)))
                    {
                        // console.log("blocked")

                        state.chatId= chatId;
                       state.user= user;
                       
                       state.isCurrentUserBlocked= false;
                       state.isReceiverBlocked= true;
                    }
                    else{
                        // console.log("not blocked")
                        state.chatId= chatId;
                       state.user= user;
                       
                       state.isCurrentUserBlocked= false;
                       state.isReceiverBlocked= false;
                    }
                   
        },

        toggleBlock:(state)=>{
         
            state.isReceiverBlocked= !state.isReceiverBlocked;
        }
        
        
    }
});

export const {toggleBlock,changeChat}= chatSlice.actions;
export default chatSlice.reducer;