import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./AlertSlice";
import { AuthSlice } from './AuthSlice'
import { ArtistAuthSlice } from './ArtistAuthSlice'

const store = configureStore({
    reducer:{
        alerts:alertSlice.reducer,
        Auth:AuthSlice.reducer,
        ArtistAuth:ArtistAuthSlice.reducer,
    },
})

export default store;