import { CharacterMock } from './character'

export const userMock = [
  {
    name: 'Luis Artur',
    email: 'algum@mail.com',
    avatar: 'https://avatars.githubusercontent.com/u/65989058?v=4',
    role: 'ADMIN',
    favoriteCharacters: [CharacterMock[0], CharacterMock[2]]
  },
  {
    name: 'Thiago Dallacqua',
    email: 'outro@mail.com',
    avatar: 'https://avatars.githubusercontent.com/u/15908506?v=4',
    role: 'USER',
    favoriteCharacters: [CharacterMock[1], CharacterMock[2]]
  }
]
