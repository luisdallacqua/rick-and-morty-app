import axios from 'axios'
import { IUser } from '../../components/RegisterForm/types'
import { setUserLocalStorage } from '../auth'

export const updateFavoriteChars = async (
  user: IUser,
  newCharacters: number[]
) => {
  const response = await axios.patch(`http://localhost:3001/users/${user.id}`, {
    favoriteCharacters: [...newCharacters]
  })
  setUserLocalStorage(response.data)

  return response
}
