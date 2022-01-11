import React from 'react'
import { IUser } from '../components/RegisterForm/types'
import { Action } from './AuthProvider'

export type UserProps = {
  name: string
  email: string
  picture?: string
  role?: string
  sub?: string
  exp?: number
  iat?: number
}

export interface IContext extends UserProps {
  signIn: (user: UserProps) => void
  signOut: () => void
}

export interface IAuthProvider {
  children: React.ReactNode
}
