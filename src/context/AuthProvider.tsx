import axios from 'axios'
import { createContext, useEffect, useReducer, useState } from 'react'
import { string } from 'yup/lib/locale'
import { IUser } from '../components/RegisterForm/types'
import { getUserLocalStorage, LoginRequest } from '../utils/auth/index'
import { IAuthProvider, IContext } from './types'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser>({} as IUser)

  const signIn = async (email: string, password: string) => {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/login',
      data: {
        email: email,
        password: password
      }
    })

    console.log(response.data)
  }

  const signOut = () => {
    console.log('signout')
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, ...user }}>
      {children}
    </AuthContext.Provider>
  )
}
