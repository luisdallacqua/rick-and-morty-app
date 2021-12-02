/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from '@mui/material'
import { CharacterProps } from '../../components/CharecterCard/types'
import BasicModal from '../../components/Modal'
import { IUser } from '../../components/RegisterForm'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import { api } from '../../services/createApi'
import { UserLogin } from '../../context/types'
import CharacterList from '../../components/CharacterList'

export const createData = (
  name: string,
  email: string,
  roles: string,
  actions: React.ReactNode,
  moreInfo: React.ReactNode,
  avatar?: string
) => {
  return { name, email, roles, actions, moreInfo, avatar }
}

const handleDelete = async (id: number) => {
  const filteredCharacter = await api.delete(`/users/${id}`)
  return filteredCharacter.data
}

export const ActionsSection = (params: IUser) => {
  return (
    <div style={{ display: 'flex' }}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => console.log(`Edit ${params.id}`)}
      >
        <ModeEditIcon />
      </Button>
      <BasicModal isDeleteOption textButton={<DeleteIcon color="error" />}>
        Você está prestes a deletar um usuário, deseja prosseguir?
        <button onClick={() => handleDelete(params.id)}>SIM</button>
      </BasicModal>
    </div>
  )
}

export const MoreInfoSection = (params: UserLogin) => {
  return (
    <BasicModal textButton="Lista de Personagens" textModalHeader={params.name}>
      <CharacterList {...params} />
    </BasicModal>
  )
}
