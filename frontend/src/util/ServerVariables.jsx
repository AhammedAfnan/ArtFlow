// normal routes like get , not post ...
// matte ejs l userRoutes il eidnne ade sambavo

export const  ServerVariables = {
    // landing
    Landing:'/',

    //userRoutes

    Login:'/login',
    Register: "/register",
    verifyOtp:'/verifyOtp',
    userHome:"/userHome",
    verifyEmail:'/verifyEmail',
    forgetOtp:'/forgetOtp',
    changePassword:'/changePassword',

    //artistRoutes
    ArtistLogin:'/artistLogin',
    ArtistRegister:'/artistRegister',
    ArtistVerifyOtp:'/artistOtp',
    ArtistHome:'/artistHome',

    //Admin Routes
    AdminLogin:'/adminLogin',
    AdminDashboard:'/dashboard',
    Users:'/Users',
    Artists:'/artists',
    Categories:'/categories',
    AddCategory:'/addCategory',
    EditCategory:'/editCategory',
    ViewArtist:'/ViewArtist',
}