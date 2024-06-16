import { createSlice } from "@reduxjs/toolkit";


const displaySlice= createSlice({
    name:"display",
    initialState:{
        showAddUser:false,
        showMoreOption:false,
    },

    reducers:{
        toggleShowAddUser:(state)=>{
            state.showAddUser= !state.showAddUser;
        },
        toggleShowMoreOption:(state)=>{
               state.showMoreOption= !state.showMoreOption;
        }
    }
})

export const {toggleShowAddUser,toggleShowMoreOption} = displaySlice.actions;
export default displaySlice.reducer;