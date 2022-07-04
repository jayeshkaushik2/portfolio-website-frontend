import { React, createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()
export default AuthContext;


export const AuthProvider = ({ children }) => {
    // localStorage.getItem("AuthTokens") ? JSON.parse(localStorage.getItem("AuthTokens")) : null
    const [User, setUser] = useState(() => localStorage.getItem("AuthTokens") ? jwt_decode(JSON.parse(localStorage.getItem("AuthTokens")).access) : null)
    const [AuthTokens, setAuthTokens] = useState(() => localStorage.getItem("AuthTokens") ? JSON.parse(localStorage.getItem("AuthTokens")) : null)
    const history = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch("api/token/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": e.target.username.value, "password": e.target.password.value })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("AuthTokens", JSON.stringify(data))
            history("/admin")
        }
        else {
            alert("Something went wrong!")
        }
    }

    let updateToken = async () => {
        let response = await fetch("api/token/refresh/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ "refresh": AuthTokens.refresh })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("AuthTokens", JSON.stringify(data))
        }
        else {
            alert("Something went wrong while refreshing!")
            logoutUser()
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("AuthTokens")
        history("/signin")
    }

    let contextData = {
        user: User,
        AuthTokens: AuthTokens,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (AuthTokens){
                updateToken()
            }
        }, 60*1000*5)
        return () => {
            clearInterval(interval)
        }
    }, [AuthTokens,])


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
