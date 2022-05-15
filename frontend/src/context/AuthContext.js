import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser]= useState({});
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const handelInfo = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        const user = JSON.parse(localStorage.getItem('user'))
        const isAuth = JSON.parse(localStorage.getItem('isAuth'))
        setUser(user)
        

    }
        


    return (
        <AuthContext.Provider value={{ 
            handelInfo ,
            user,
            token,
            isAuthenticated,
            setUser,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;