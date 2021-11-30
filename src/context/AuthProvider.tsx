import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { getUserLocalStorage, setUserLocalStorage } from '../utils/auth/index'
import { IAuthProvider, IContext, UserLogin } from './types'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<UserLogin | null>()

  useEffect(() => {
    const user = getUserLocalStorage()

    if (user) setUser(user)
  }, [])

  async function authenticate(email: string, password: string) {
    const params = { email, password }

    const response = await axios.get('http://localhost:3001/users', { params })

    const payload: UserLogin = {
      id: response.data[0].id,
      name: response.data[0].name,
      email: response.data[0].email,
      password: response.data[0].password,
      cpf: response.data[0].cpf,
      birthDate: response.data[0].birthDate,
      role: response.data[0].role,
      image: response.data[0].image,
      favoriteCharacters: response.data[0].favoriteCharacters
    }

    setUser(payload)
    setUserLocalStorage(payload)
  }

  async function logout() {
    setUser(null)
    setUserLocalStorage(null)
  }

  return (
    <AuthContext.Provider value={{ authenticate, logout, ...user }}>
      {children}
    </AuthContext.Provider>
  )
}
