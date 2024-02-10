import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import MyButton from '../../components/MyButton';

const loginSchema = Yup.object().shape({
  email:Yup.string().email("Invalid Email").required("Email is required"),
  password:Yup.string()
    .min(6,"Password must be atleast 6 characters")
    .required("Password is required")
})

const AdminLogin = () => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:loginSchema,
    onSubmit:(values)=>{
      dispatch()
    }
  })

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
