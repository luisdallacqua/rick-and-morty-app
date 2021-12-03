import axios from 'axios'
import { IUser } from '../../components/RegisterForm/types'

export function setUserLocalStorage(user: IUser) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUserLocalStorage() {
  if (typeof window !== 'undefined') {
    const json = localStorage.getItem('user')
    if (!json) return {} as IUser
    const user = JSON.parse(json)
    return user
  }

  return {} as IUser
}

export async function LoginRequest(email: string, password: string) {
  try {
    const params = { email, password }

    const request = await axios.post('http://localhost:3001/users', { params })

    return request ? request.data : ({} as IUser)
  } catch (error) {
    return {} as IUser
  }
}
