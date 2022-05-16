import  { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom"; 

const SignUp = () => { 

  const {signUp , handelChangeSignUp ,infoSignUp } = useContext(AuthContext);



  const handleSubmit = async (e) => {
    e.preventDefault();

    signUp()
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
            onChange={handelChangeSignUp}
            value={infoSignUp.name}
            required
          />

          <label htmlFor="username">Email:</label>
          <input
            type="text"
            name="email"
            autoComplete="off"
            onChange={handelChangeSignUp}
            value={infoSignUp.email}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handelChangeSignUp}
            value={infoSignUp.password}
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
