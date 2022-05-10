import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const { setAuth, auth } = useContext(AuthContext);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const LOGIN_URL = "http://localhost:5000/api/login";

  // navigate after login

  const handleSubmit = async (e) => {
    e.preventDefault();

   await axios
      .post(LOGIN_URL, info)
      .then((res) => {
        // console.log(res.data);
        setInfo({ email: "", password: "" });
        toast.success("login  Successful");
        // set token to local storage
        localStorage.setItem("token", res.data.token);
         setAuth(res.data);


        if (res.data.user.role === 1) {
          console.log(auth.role);
          navigate("/dashboard-admin");
        } else {
          navigate("/dashboard-user");
        }
        
      })
      .catch((err) => {
        console.log(err);
        toast.error("login Failed");
      });



      
  };



  return (
    <div>
      <section>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            name="email"
            autoComplete="off"
            onChange={handelChange}
            value={info.email}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handelChange}
            value={info.password}
            required
          />
          <button>Login</button>
        </form>
        <p>
          <br />
          <span className="line">
            <Link to="/signup">SignUp</Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
