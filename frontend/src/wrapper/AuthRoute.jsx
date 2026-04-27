import { useAuth } from '@/context/UserContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children,allowedRoles=[]}) => {
    const {isLoggedIn,user,token}= useAuth()
    const navigate = useNavigate()
    if(!isLoggedIn){
        return <Navigate to="/login" replace/>
    } 
    if(!allowedRoles.includes(user.role)){
      return <Navigate to="/unAuthorized" replace/>
    }
  return children
}

export default AuthRoute
