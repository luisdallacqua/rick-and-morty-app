import React from 'react'
import { IUser } from '../components/RegisterForm/types'
import { Action } from './AuthProvider'

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<void>
  logout: () => void
  dispatch: (arg: Action) => void
}

export interface IAuthProvider {
  children: React.ReactNode
}
