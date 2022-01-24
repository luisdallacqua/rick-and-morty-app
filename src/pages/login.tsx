import React from 'react'
import { PublicRoute } from '../components/ProtectedRoute'
import SignIn from '../components/SignIn'

const Login = () => {
  return (
    <div>
      <SignIn />
    </div>
  )
}

export default PublicRoute(Login)
