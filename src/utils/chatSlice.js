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
            console.log(action);

            const {chatId,user,currentUser}= action.payload;
            
            if(user?.blocked.includes(currentUser?.Id))
                {
                    state.chatId= chatId;
                    state.user= null;
                    state.isCurrentUserBlocked= true;
                    state.isReceiverBlocked= false;


                }

                if(currentUser?.blocked.includes(user?.Id))
                    {
                       state.chatId= chatId;
                       state.user= null;
                       state.isCurrentUserBlocked= false;
                       state.isReceiverBlocked= true;
                    }
                    else{
                        state.chatId= chatId;
                       state.user= null;
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