import { useAuth } from '@/context/UserContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}) => {
    const {isLoggedIn,user,token}= useAuth()
    const navigate = useNavigate()
    if(!isLoggedIn){
        return <Navigate to="/login" replace/>
    } 
  return children
}

export default AuthRoute
