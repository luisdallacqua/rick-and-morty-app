import { api } from '../../services/createApi'

export const updateFavoriteChars = async (
  action: string,
  newCharacter: number,
  id?: string
) => {
  if (!id) return
  const response = await api.patch(`http://localhost:3000/api/user`, {
    action,
    _id: id,
    favoriteCharacters: newCharacter
  })
  console.log('response', response)

  return response
}
