import { createContext, useContext, useState } from "react";


const initializeAuth = ()=>{
    const userToken = localStorage.getItem("access_token") || null
    const userData = JSON.parse(localStorage.getItem("user") || "null") 
    return {userToken,userData}
}
const AuthContext = createContext()


export const AuthProvider = ({children})=>{
    const {userToken,userData} = initializeAuth()
    const [user,setUser] = useState(userData || null)
    const [token,setToken] = useState(userToken || null)
    const [isLoggedIn,setIsLoggedIn] = useState(userToken ? true : false)

    const loggedInUser = (loginUser,loginUserToken)=>{
          if(loginUser && loginUserToken){
            localStorage.setItem("access_token",loginUserToken)
            localStorage.setItem("user",JSON.stringify(loginUser))
            setIsLoggedIn(true)
            setUser(loginUser)
            setToken(loginUserToken)
          }
    }

    const logoutUser = ()=>{
        localStorage.removeItem("access_token")
        localStorage.removeItem("user")
        setIsLoggedIn(false)
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{user,token,isLoggedIn,loggedInUser,logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const atx = useContext(AuthContext)
    if(!atx){
        throw new Error("Auth Context must used within Auth Provider")
    }
    return atx
}