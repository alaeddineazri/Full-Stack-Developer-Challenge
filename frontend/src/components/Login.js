import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const { isAuthenticated, loading, setLoading, handelInfo } = useContext(AuthContext);

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
      handelInfo()
    } catch (err) {
      if (!err?.res) {
        toast.error("login Failed");
      }

    }



  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
    // setLoading(true);


  }


  // setLoading(false); 
  // useEffect(() => {
  //   if (user) {
  //     if (user.role === 1) {
  //                 navigate("/dashboard-admin");
  //               } else {
  //                 navigate("/dashboard-user");
  //               }
  //   }
  // }, [user, navigate]);







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
          {loading && (
            <h3>loading...</h3>
          )}
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
