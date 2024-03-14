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
    updateUserProfile: "/api/user/updateUserProfile",
    getCurrentUser: "api/user/getCurrentUser",
    getAllBanners: "/api/user/getAllBanners",
    getAllArtists: "/api/user/getAllArtists",
    followArtist: "/api/user/followArtist",
    unFollowArtist: "/api/user/unFollowArtist",

    //artist endpoints
    getCategories: "/api/artist/getCategories",
    postArtistRegister: "/api/artist/artistRegister",
    postArtistVerifyLogin:"/api/artist/artistVerifyLogin",
    postArtistOtp: "/api/artist/artistOtp",
    ArtistResendOtp: "/api/artist/artistResendOtp",
    editArtistProfile: "/api/artist/editArtistProfile",
    getMySubscriptions: "/api/artist/getMySubscriptions",
    getPlansAvailable: "/api/artist/getPlansAvailable",
    subscribePlan: "/api/artist/subscribePlan",
    uploadPost: "/api/artist/uploadPost",
    getMyPosts: "/api/artist/getMyPosts",
    deletePost: "/api/artist/deletePost",
    checkArtistBlocked: "/api/artist/checkArtistBlocked",
    getPostComments: "/api/artist/getPostComments",

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
    showPlans: "/api/admin/showPlans",
    unlistPlan: "/api/admin/deletePlan",
    updatePlan: "/api/admin/updatePlan",
    postAddPlan: "/api/admin/postAddPlan",
    showBanners: "/api/admin/showBanners",
    addBanner: "/api/admin/addBanner",
    deleteBanner: "/api/admin/deleteBanner",
    getSubscriptionHistory: "/api/admin/getSubscriptionHistory"
}