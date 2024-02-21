import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutArtist } from '../../redux/ArtistAuthSlice'; // Import your logout action creator

const ArtistHome = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.ArtistAuth);

  const handleLogout = () => {
    // Dispatch the logout action here
    dispatch(logoutArtist());
  }

  return (
    <>
      <h1>This is Artist Home</h1>
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

export default ArtistHome










