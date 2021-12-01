import axios from 'axios'
import { UserLogin } from '../../context/types'

export const updateFavoriteChars = async (
  user: UserLogin,
  newCharacters: number[]
) => {
  const response = await axios.put(`http://localhost:3001/users/${user.id}`, {
    ...user,
    favoriteCharacters: [...newCharacters]
  })

  return response
}
