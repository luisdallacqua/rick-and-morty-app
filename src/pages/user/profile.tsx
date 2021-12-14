import React, { useEffect, useState } from 'react'
import { IUser } from '../../components/RegisterForm/types'
import UserPage from '../../components/UserPage'
import { api } from '../../services/createApi'

const Profile = () => {
  const [user, setUser] = useState<IUser>({} as IUser)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get('/user')
      const data = await response.data
      setUser(data[0])
    }
    fetchUsers()
  }, [])

  return <UserPage {...user} />
}

export default Profile
