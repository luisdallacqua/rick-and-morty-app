import { api } from '../../services/createApi'

export const updateFavoriteChars = async (
  action: string,
  id: string,
  newCharacter: number
) => {
  const response = await api.patch(`http://localhost:3000/api/user`, {
    action,
    _id: id,
    favoriteCharacters: newCharacter
  })
  console.log('response', response)

  return response
}
