import axios from 'axios'
import { createContext, useEffect, useReducer, useState } from 'react'
import { IUser } from '../components/RegisterForm/types'
import { getUserLocalStorage, setUserLocalStorage } from '../utils/auth/index'
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

  async function authenticate(email: string, password: string) {
    const params = { email, password }

    const response = await axios.get('http://localhost:3001/users', { params })

    const payload: IUser = {
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

    dispatch({ type: 'update', payload })
    setUserLocalStorage(payload)
  }

  async function logout() {
    dispatch({ type: 'logout' })
    setUserLocalStorage({} as IUser)
  }

  return (
    <AuthContext.Provider value={{ dispatch, logout, authenticate, ...user }}>
      {children}
    </AuthContext.Provider>
  )
}
