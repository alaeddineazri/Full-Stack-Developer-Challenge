import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => { 

  let navigate = useNavigate();


  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  

  const SIGNUP_URL = "http://localhost:5000/api/signup";

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(SIGNUP_URL, info)
      .then((res) => {
        console.log(res.data);
        setInfo({ name: "", email: "", password: "" });
        toast.success("Sign Up Successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Sign Up Failed");
      });
  };

  return (
    <div className="App">
      <section>
        <h1>SignUp</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            onChange={handelChange}
            value={info.name}
            required
          />

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
          <button>Sign In</button>
        </form>
        <p>
          <br />
          <span className="line">
          <Link to="/">Login</Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default SignUp;
