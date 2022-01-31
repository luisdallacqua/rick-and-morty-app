import React from 'react'
import { PublicRoute } from '../components/ProtectedRoute'
import SignIn from '../components/SignIn'

const Login = () => {
  return <SignIn />
}

export default PublicRoute(Login)
