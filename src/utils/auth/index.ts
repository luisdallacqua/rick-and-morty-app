import axios from 'axios'
import { UserLogin } from '../../context/types'

export function setUserLocalStorage(user: UserLogin | null) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUserLocalStorage() {
  if (typeof window !== 'undefined') {
    const json = localStorage.getItem('user')
    if (!json) return null
    const user = JSON.parse(json)
    return user
  }

  return null
}

export function upDateUserLocalStorage(user: UserLogin | null) {
  if (typeof window !== 'undefined') {
    const json = localStorage.getItem('user')
    if (!json) return null
    const userLocal = JSON.parse(json)
    const userUpdate = {
      ...userLocal,
      ...user
    }
    localStorage.setItem('user', JSON.stringify(userUpdate))
  }
}

export async function LoginRequest(email: string, password: string) {
  try {
    const params = { email, password }

    const request = await axios.post('http://localhost:3001/users', { params })

    return request ? request.data : null
  } catch (error) {
    return null
  }
}
