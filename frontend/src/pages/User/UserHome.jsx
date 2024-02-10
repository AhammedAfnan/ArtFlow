import React from 'react'
import { useSelector } from 'react-redux'

const UserHome = () => {
  const { user } = useSelector((state)=>state.Auth)
  return (
    <>
    <h1>This is Home</h1>
    </>
  )
}

export default UserHome
