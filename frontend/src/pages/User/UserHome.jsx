import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/AuthSlice'; // Import your logout action creator

const UserHome = () => {
  const { token } = useSelector(state => state.Auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action here
    dispatch(logoutUser());
  }

  return (
    <>
      <h1>This is Home</h1>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  )
}

export default UserHome
