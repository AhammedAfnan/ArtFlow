import React from 'react'
import MyButton from '../../components/MyButton';

const AdminLogin = () => {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-black text-white p-8 rounded shadow-md w-96 text-center">
            <img
              src="/images/userImages/hub1.png"
              alt="Logo"
              className="h-28 w-44 mx-auto"
            />
            <h2 className="text-2xl font-bold mb-6">ADMIN LOGIN</h2>
    
            <form onSubmit='' noValidate>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  className="text-black w-full p-2 border border-gray-300 rounded"
                  value=''
                  onChange=''
                  onBlur=''
                />
              </div>
              

              


              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  className="text-black w-full p-2 border border-gray-300 rounded"
                  value=''
                  onChange=''
                  onBlur=''
                />
              </div>





              <div className="flex items-center justify-center">
                <MyButton text="Login" />
              </div>
            </form>
          </div>
        </div>
      );
}

export default AdminLogin
