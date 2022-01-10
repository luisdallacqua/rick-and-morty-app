import axios from 'axios'
import { createContext, useEffect, useReducer, useState } from 'react'
import { string } from 'yup/lib/locale'
import { IUser } from '../components/RegisterForm/types'
import { getUserLocalStorage, LoginRequest } from '../utils/auth/index'
import { IAuthProvider, IContext, UserProps } from './types'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<UserProps>({} as UserProps)

  const signIn = async (user: UserProps) => {
    setUser(user)
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
