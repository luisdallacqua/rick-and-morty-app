import {
  ActionsSection,
  createData,
  MoreInfoSection
} from '../../utils/data/createDataForTable'
import { IUser } from '../RegisterForm'

export const rowsFormatter = (users: IUser[]) =>
  users.map((user) => {
    return createData(
      user.name,
      user.email,
      user.role,
      ActionsSection(user),
      MoreInfoSection(user),
      user.image
    )
  })
