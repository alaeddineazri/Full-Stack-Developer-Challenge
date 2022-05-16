import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { isAuthenticated,Loading, infoLogin, login, handelChangeLogin, navigateAfterLogin } = useContext(AuthContext);


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
            onChange={handelChangeLogin}
            value={infoLogin.email}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handelChangeLogin}
            value={infoLogin.password}
            required
          />
          <button>{Loading? "Loading..." : "Login"}</button>
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
