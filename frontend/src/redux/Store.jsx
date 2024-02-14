import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./AlertSlice";
import { AuthSlice } from './AuthSlice'
import { ArtistAuthSlice } from './ArtistAuthSlice'
import { AdminAuthSlice } from './AdminAuthSlice'

const store = configureStore({
    reducer:{
        alerts:alertSlice.reducer,
        Auth:AuthSlice.reducer,
        ArtistAuth:ArtistAuthSlice.reducer,
        AdminAuth:AdminAuthSlice.reducer,
    },
})

export default store;