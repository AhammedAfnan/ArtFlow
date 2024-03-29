import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/AlertSlice";
import { adminRequest } from "../../Helper/instance";
import { apiEndPoints } from "../../util/api";
import { useLocation, useNavigate } from "react-router-dom";
import { ServerVariables } from "../../util/ServerVariables";
import toast from "react-hot-toast";

function EditCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const location = useLocation()
  const category =  location.state?location.state.category:''
  useEffect(()=>{
    if(category){
        setName(category.name)
        setDescription(category.description)
      }
  },[])
 

  const handleUpdateCategory = (e)=>{
    e.preventDefault()
    if(!name || !description){
        setError('All fields should be filled!')
        return setTimeout(()=>{
            setError('')
        },2000)
    }
    if(name.length<3){
        setError('Name must be atleast 3 characters')
        return setTimeout(()=>{
            setError('')
        },2000)
    }
    if(description.length<10){
        setError('description needs altleast 10 characters')   
        return setTimeout(()=>{
            setError('')
        },2000)
    }
    dispatch(showLoading())
    adminRequest({
        url:apiEndPoints.updateCategory,
        method:'post',
        data:{name:name,description:description,id:category._id}
    }).then((res)=>{
        dispatch(hideLoading())
        if(res.data.success){
            navigate(ServerVariables.Categories)
            toast.success(res.data.success)
        }else{
            toast.error(res.data.error)
        }
    }).catch((err) => {
      dispatch(hideLoading());
      toast.error("something went wrong");
      console.log(err.message);
    });
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              EDIT FIELD
            </h1>
          </div>
        </header>

        <main>
          <div className="mt-8 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Your content */}
            <form>
              <div className="space-y-12 ml-8 mr-8">
              {error?<p className="text-sm font-bold text-red-600">{error}</p>:''}
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="Field Name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Field Name
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="please enter the field name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder=" Write a description for the field"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="submit"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => navigate(ServerVariables.Categories)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onClick={handleUpdateCategory}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="overflow-x-auto"></div>
          </div>
        </main>
      </div>
    </>
  );
}

export default EditCategory;