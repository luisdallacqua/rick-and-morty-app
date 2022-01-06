import { createContext, useEffect, useReducer, useState } from 'react'
import { IUser } from '../components/RegisterForm/types'
import { getUserLocalStorage, LoginRequest } from '../utils/auth/index'
import { IAuthProvider, IContext } from './types'

export const AuthContext = createContext<IContext>({} as IContext)

const initialState = {} as IUser

export type Action = {
  type: string
  payload?: IUser
}

function reducer(state: IUser, action: Action): IUser {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload }
    case 'logout':
      return {} as IUser
    default:
      return state
  }
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const user = getUserLocalStorage()

    if (Object.keys(user).length) dispatch({ type: 'update', payload: user })
  }, [])

  async function authenticate(email: string) {
    const response = await LoginRequest(email)

    const payload: IUser = {
      _id: response._id,
      name: response.name,
      email: response.email,
      password: response.password,
      role: response.role,
      avatar: response.image,
      favoriteCharacters: response.favoriteCharacters
    }

    dispatch({ type: 'update', payload })
  }

  async function logout() {
    dispatch({ type: 'logout' })
  }

  return (
    <AuthContext.Provider value={{ dispatch, logout, authenticate, ...user }}>
      {children}
    </AuthContext.Provider>
  )
}
