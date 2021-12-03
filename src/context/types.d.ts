import React from 'react'
import { IUser } from '../components/RegisterForm/types'

// export interface UserLogin {
//   id?: number
//   name?: string
//   email: string
//   password: string
//   cpf?: string
//   birthDate?: string
//   role?: string
//   image?: string
//   favoriteCharacters?: number[]
// }

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<void>
  logout: () => void
}

export interface IAuthProvider {
  children: React.ReactNode
}
