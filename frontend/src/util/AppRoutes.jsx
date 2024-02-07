// eni aintokke routes eede eidnne .. backend le userRoutes page polthe frontend nte

import React from 'react'
import {Routes,Route} from 'react-router-dom';
import { ServerVariables } from './ServerVariables';
import RegisterPage from '../pages/User/RegisterPage';
import LoginPage from '../pages/User/LoginPage';
import ArtistRegister from '../pages/Artist/ArtistRegister';
import ArtistLogin from '../pages/Artist/ArtistLogin';
import AdminLogin from '../pages/Admin/AdminLogin';
import OtpVerification  from '../pages/User/OtpRegister';


const AppRoutes = () => {
  return (
    <div>
      <Routes>
        //userRoutes

        <Route path={ServerVariables.Register} element={<RegisterPage/>}/>
        <Route path={ServerVariables.Login} element={<LoginPage/>}/>
        <Route path={ServerVariables.verifyOtp} element={<OtpVerification/>}/>


        //artistRoutes
        <Route path={ServerVariables.ArtistRegister} element={<ArtistRegister/>}/>
        <Route path={ServerVariables.ArtistLogin} element={<ArtistLogin/>}/>

        //adminRoutes
        <Route path={ServerVariables.AdminLogin} element={<AdminLogin/>}/>


      </Routes>
    </div>
  )
}

export default AppRoutes
