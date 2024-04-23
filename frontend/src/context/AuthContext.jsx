import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    token: null,
    setToken: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [token, _setToken] = useState(localStorage.getItem("token"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem('token')
        }
    };

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
