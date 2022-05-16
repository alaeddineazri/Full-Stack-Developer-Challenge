import { createContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let navigate = useNavigate();



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
            user,
            token,
            isAuthenticated,
            setUser,
            logout,
            navigateAfterLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;