import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";


const DashboardAdmin = () => {
  const {  auth } = useContext(AuthContext);


    console.log('auth',auth)

  


  return (
    <>
    <div>DashboardAdmin</div>
    <p>{auth.user.name}</p>
    </>
  )
}

export default DashboardAdmin