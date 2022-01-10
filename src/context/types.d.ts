import React from 'react'
import { IUser } from '../components/RegisterForm/types'
import { Action } from './AuthProvider'

export interface IContext extends IUser {
  signIn: (email: string, password: string) => void
  signOut: () => void
}

export interface IAuthProvider {
  children: React.ReactNode
}
