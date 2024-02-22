// eni aintokke routes eede eidnne .. backend le userRoutes page polthe frontend nte

import React from 'react'
import Toaster from 'react-hot-toast'
import { useSelector } from 'react-redux';
import {Routes,Route} from 'react-router-dom';
import { ServerVariables } from './ServerVariables';
import RegisterPage from '../pages/User/RegisterPage';
import LoginPage from '../pages/User/LoginPage';
import ArtistRegister from '../pages/Artist/ArtistRegister';
import OtpVerification from "../pages/User/OtpRegister";
import ArtistLogin from '../pages/Artist/ArtistLogin';
import AdminLogin from '../pages/Admin/AdminLogin';
import LandingPage from '../pages/LandingPage';
import ErrorPage from '../pages/404ErrorPage';
import IsLoggedOutUser from '../components/middlewares/IsLoggedOutUser';
import IsLoggedUser from '../components/middlewares/IsLoggedUser';
import IsAdminLoggedOut from "../components/middlewares/IsAdminLoggedOut";
import IsAdminLogged from "../components/middlewares/IsAdminLogged";
import IsArtistLogged from "../components/middlewares/IsArtistLogged"
import IsArtistLoggedOut from "../components/middlewares/IsArtistLoggedOut"
import UserHome from '../pages/User/UserHome';
import Dashboard from '../pages/Admin/Dashboard';
import Users from '../pages/Admin/Users';
import Categories from '../pages/Admin/Categories'
import AddCategory from "../pages/Admin/AddCategory";
import EditCategory from "../pages/Admin/EditCategory";
import ArtistOtp from '../pages/Artist/ArtistOtp';
import ArtistHome from '../pages/Artist/ArtistHome';
import Artists from '../pages/Admin/Artist';
import ArtistView from '../pages/Admin/ArtistView';
import VerifyEmail from '../pages/User/VerifyEmail';
import ForgetOtp from "../pages/User/ForgetOtp";
import ChangePassword from '../pages/User/ChangePassword';



function AppRoutes () {
  const {loading} = useSelector((state)=>state.alerts)
  return (
    <div>
      {/* loading spinner ui */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-100 bg-opacity-90">
        <div className="text-blue-500 flex justify-center items-center">
          <svg
            className="animate-spin h-16 w-16 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.292-1.29-8.544-3.544l1.414-1.414z"
            ></path>
          </svg>
        </div>
      </div>
      )}

       {/* toast ui */}
       <Toaster position="top-center" reverseOrder={false} />

      <Routes>

        <Route path={ServerVariables.Landing} element={<LandingPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>

        
        //userRoutes
        <Route element={<IsLoggedOutUser/>}>
          <Route path={ServerVariables.Register} element={<RegisterPage/>}/>
          <Route path={ServerVariables.verifyOtp} element={<OtpVerification />}/>
          <Route path={ServerVariables.verifyEmail} element={<VerifyEmail />} />     
          <Route path={ServerVariables.forgetOtp} element={<ForgetOtp />} />       
 
            
          <Route path={ServerVariables.Login} element={<LoginPage/>}/>
        </Route>

        <Route element={<IsLoggedUser/>}>
           <Route path={ServerVariables.userHome} element={<UserHome/>}/>
        </Route>

        //artistRoutes
      <Route element={<IsArtistLoggedOut/>}>
        <Route path={ServerVariables.ArtistRegister} element={<ArtistRegister/>}/>
        <Route path={ServerVariables.ArtistLogin} element={<ArtistLogin/>}/>
        <Route path={ServerVariables.ArtistVerifyOtp} element={<ArtistOtp />}/>
      </Route>

      <Route element={<IsArtistLogged/>}>
          <Route path={ServerVariables.ArtistHome} element={<ArtistHome/>}/>
      </Route>
        //adminRoutes

    <Route element={<IsAdminLoggedOut/>}>
        <Route path={ServerVariables.AdminLogin} element={<AdminLogin/>}/>
    </Route>
    
    <Route element={<IsAdminLogged/>}>
        <Route path={ServerVariables.AdminDashboard} element={<Dashboard/>}/>
        <Route path={ServerVariables.Users} element={<Users/>}/>
        <Route path={ServerVariables.Categories} element={<Categories/>} />
        <Route path={ServerVariables.AddCategory} element={<AddCategory />} />
        <Route path={ServerVariables.EditCategory} element={<EditCategory />}/>
        <Route path={ServerVariables.Artists} element={<Artists />} />
        <Route path={ServerVariables.ViewArtist} element={<ArtistView/>} />
        <Route path={ServerVariables.changePassword } element={<ChangePassword />} />
    </Route>
        

      </Routes>
    </div>
  )
}

export default AppRoutes
