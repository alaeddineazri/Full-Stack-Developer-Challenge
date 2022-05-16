import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import {  Link } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, loading, handelInfo ,navigateAfterLogin,user} = useContext(AuthContext);

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const LOGIN_URL = "http://localhost:5000/api/login";


  const login = async () => {
    try {
      const res = await axios.post(LOGIN_URL, info);
      setInfo({ email: "", password: "" });
      toast.success("login  Successful");
      localStorage.setItem('token', JSON.stringify(res.data.token))
      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('isAuth', JSON.stringify(true))
      handelInfo(); 
      console.log( "isAuthenticated context",isAuthenticated)
    } catch (err) {
      if (!err?.res) {
        toast.error("login Failed");
      }

    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigateAfterLogin();
    }
  }, [isAuthenticated, navigateAfterLogin]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  }



  







  return (
    <div className="App">
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
