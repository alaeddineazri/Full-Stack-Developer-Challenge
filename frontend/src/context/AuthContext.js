import { createContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [infoSignUp, setInfoSignUp] = useState({
        name: "",
        email: "",
        password: "",
      });

    const [infoLogin, setInfoLogin] = useState({
        email: "",
        password: "",
    });
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    let navigate = useNavigate();

    const handelChangeSignUp = (e) => {
        setInfoSignUp({
            ...infoSignUp,
            [e.target.name]: e.target.value,
        });
    };

    const handelChangeLogin = (e) => {
        setInfoLogin({ ...infoLogin, [e.target.name]: e.target.value });
    };

    const SIGNUP_URL = "http://localhost:5000/api/signup";
    const LOGIN_URL = "http://localhost:5000/api/login";

    const signUp = async () => {
        try {
            setLoading(true);
            const res = await axios.post(SIGNUP_URL, infoSignUp);
            console.log(res.data);
            setInfoSignUp({ name: "", email: "", password: "" });
            toast.success("Sign Up Successful");
            navigate("/");
        } catch (err) {
            if (!err?.res) {
                toast.error("login Failed");
            }

        }
    }





    const login = async () => {
        try {
            const res = await axios.post(LOGIN_URL, infoLogin);
            setInfoLogin({ email: "", password: "" });
            toast.success("login  Successful");
            localStorage.setItem('token', JSON.stringify(res.data.token))
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('isAuth', JSON.stringify(true))
            handelInfo();
            setLoading(true);
        } catch (err) {
            if (!err?.res) {
                toast.error("login Failed");
            }

        }
    }




    const handelInfo = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        const user = JSON.parse(localStorage.getItem('user'))
        const isAuth = JSON.parse(localStorage.getItem('isAuth'))
        setUser(user)
        setToken(token)
        setIsAuthenticated(isAuth)


    }


    const navigateAfterLogin = () => {
        if (isAuthenticated && user.role === 0) {
            navigate("/user-dashboard");
            setLoading(false)
        } else if (isAuthenticated && user.role === 1) {
            navigate("/admin-dashboard");
        }
    }




    const logout = () => {
        setUser({})
        setToken(null)
        setIsAuthenticated(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('isAuth')

    }



    return (
        <AuthContext.Provider value={{
            handelInfo,
            handelChangeSignUp,
            handelChangeLogin,
            setInfoLogin,
            signUp,
            user,
            token,
            infoLogin,
            infoSignUp,
            login,
            isAuthenticated,
            setUser,
            logout,
            navigateAfterLogin,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;