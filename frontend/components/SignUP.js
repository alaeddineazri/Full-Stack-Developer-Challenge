import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log("info",info)

  const handelChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
}


  const LOGIN_URL = "http://localhost:5000/api/signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(LOGIN_URL, info);
    console.log(info)
    console.log(res.data);
    setInfo({ name: "", email: "", password: "" });
  };

  return (
    <div>
      <section>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            onChange={handelChange}
            value={info.name}
            required
          />

          <label htmlFor="username">Username:</label>
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
            oonChange={handelChange}
            value={info.pasword}
            required
          />
          <button>Sign In</button>
        </form>
        <p>
          <br />
          <span className="line">
            {/*router link */}
            <a href="#">Sign Up</a>
          </span>
        </p>
      </section>
      
    </div>
    )

};

export default SignUp;
