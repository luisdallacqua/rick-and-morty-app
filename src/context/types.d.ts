import React, { Dispatch, SetStateAction } from 'react'
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
  setUser: Dispatch<SetStateAction<UserProps>>
}

export interface IAuthProvider {
  children: React.ReactNode
}
