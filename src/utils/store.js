import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./displaySlice"
import userReducer from "./userSlice"
import chatSlice from "./chatSlice";


const store= configureStore({
    reducer:{
        display:displayReducer,
        user: userReducer,
        chat:chatSlice


    }
})

export default store;