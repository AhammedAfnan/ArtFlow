//  id routes all , datat pass cheyyan ello
// verum aa page show cheyyand ello servervariables eideen , 
// data pass cheyyended allengil backend lek poovan ille routes eel .. post like that

export const apiEndPoints = {

    // user endPoints
    postRegisterData:'/api/user/register',
    postVerifyOtp: "/api/user/verifyOtp",
    postVerifyLogin:'/api/user/verifyLogin',
    postResendOtp: "/api/user/resendOtp",

    //artist endpoints
    getCategories: "/api/artist/getCategories",
    postArtistRegister: "/api/artist/artistRegister",
    postArtistVerifyLogin:"/api/artist/artistVerifyLogin",

     //admin endpoints
    postAdminLogin: "/api/admin/postAdminLogin",
}