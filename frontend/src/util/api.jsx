//  id routes all , datat pass cheyyan ello
// verum aa page show cheyyand ello servervariables eideen , 
// data pass cheyyended allengil backend lek poovan ille routes eel .. post like that

export const apiEndPoints = {

    // user endPoints
    postRegisterData:'/api/user/register',
    postVerifyOtp: "/api/user/verifyOtp",
    postResendOtp: "/api/user/resendOtp",
    postVerifyLogin:'/api/user/verifyLogin',
    forgetVerifyEmail: "/api/user/verifyEmail",
    updatePassword: "/api/user/updatePassword",

    //artist endpoints
    getCategories: "/api/artist/getCategories",
    postArtistRegister: "/api/artist/artistRegister",
    postArtistVerifyLogin:"/api/artist/artistVerifyLogin",
    postArtistOtp: "/api/artist/artistOtp",
    ArtistResendOtp: "/api/artist/artistResendOtp",

     //admin endpoints
    postAdminLogin: "/api/admin/postAdminLogin",
    Users: '/api/admin/Users',
    blockUser: "/api/admin/blockUser",
    showCategories: "/api/admin/showCategories",
    postAddCategory: "/api/admin/AddCategory",
    unlistCategory: "/api/admin/deleteCategory",
    updateCategory: "/api/admin/updateCategory",
    blockArtist: "/api/admin/blockArtist",
    approveArtist: "/api/admin/approveArtist",
    showArtists: "/api/admin/showArtists",
}