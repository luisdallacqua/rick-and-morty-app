import {
  ActionsSection,
  MoreInfoSection
} from '../../utils/data/createDataForTable'
import { IUser } from '../RegisterForm/types'

export const rowsFormatter = (users: IUser[]) =>
  users.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      actions: ActionsSection(user),
      moreInfo: MoreInfoSection(user),
      avatar: user.avatar
    }
  })

export const headerColumns = [
  'Avatar',
  'Usuário',
  'Email',
  'Permissão',
  'Ações',
  'Personagens Favoritos'
]
