import { createSlice } from "@reduxjs/toolkit";


const displaySlice= createSlice({
    name:"display",
    initialState:{
        showAddUser:false,
    },

    reducers:{
        toggleShowAddUser:(state)=>{
            state.showAddUser= !state.showAddUser;
        }
    }
})

export const {toggleShowAddUser} = displaySlice.actions;
export default displaySlice.reducer;