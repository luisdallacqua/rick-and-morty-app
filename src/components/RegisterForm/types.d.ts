export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  cpf: string
  birthDate: string
  role: string
  avatar?: string
  favoriteCharacters: number[]
}
