import axios from 'axios'
import { UserLogin } from '../../context/types'
import { upDateUserLocalStorage } from '../auth'

export const updateFavoriteChars = async (
  user: UserLogin,
  newCharacters: number[]
) => {
  const response = await axios.put(`http://localhost:3001/users/${user.id}`, {
    ...user,
    favoriteCharacters: [...newCharacters]
  })
  upDateUserLocalStorage(response.data)

  console.log(response)
  return response
}
