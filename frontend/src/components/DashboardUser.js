import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const DashboardUser = () => {
  const { setAuth, auth } = useContext(AuthContext);

  return (
    <>
      <div>DashboardUser</div>
    </>
  );
};

export default DashboardUser;
