import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const { user, handelInfo , logout } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    handelInfo()
  }, []);

  const handelLogout = () => {
    logout()
    navigate ("/")
  }

  return (
    <div>
      {user &&
        <>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
          <h1>{user._id}</h1>
          <h1>{user.role}</h1>
        </>
      }
      <button onClick={handelLogout}>Logout</button>
    </div>
  )
}

export default AdminDashboard

