import { useSession } from 'next-auth/client'
import React, { useEffect, useState } from 'react'
import authRoute from '../../components/ProtectedRoute'
import UserPage from '../../components/UserPage'
import { UserProps } from '../../context/types'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/createApi'

const Profile = () => {
  const auth = useAuth()
  const userContext = {
    _id: auth.sub as string,
    email: auth.email,
    name: auth.name,
    role: auth.role as string,
    picture: auth.picture
  }

  const [user, setUser] = useState<UserProps>(userContext)

  return <UserPage {...user} />
}

export default authRoute(Profile)
