import { ActionsSection, createData } from '../../utils/data/createDataForTable'
import { IUser } from '../RegisterForm'

import BasicModal from '../Modal/index'

import CharacterList from '../CharacterList'

export const rows = (users: IUser[]) =>
  users.map((user) => {
    return createData(
      user.name,
      user.email,
      user.role,
      ActionsSection(user),
      <BasicModal textButton="Lista de Personagens" textModalHeader={user.name}>
        <CharacterList />
      </BasicModal>,
      user.image
    )
  })
