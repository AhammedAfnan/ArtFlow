import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./AlertSlice";

const store = configureStore({
    reducer:{
        alerts:alertSlice.reducer,
    },
})

export default store;