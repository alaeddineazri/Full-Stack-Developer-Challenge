import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext';






const AdminDashboard = () => {
  const {user  , handelInfo} = useContext(AuthContext);

  useEffect(() => {
    handelInfo()
  }, []);

  return (
    <div>{user &&
      <>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user._id}</h1>
      
      </>
      }
    </div>
  )
}

export default AdminDashboard

