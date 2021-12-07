/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from '@mui/material'
import BasicModal from '../../components/Modal'
import { IUser } from '../../components/RegisterForm/types'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import { api } from '../../services/createApi'
import CharacterList from '../../components/CharacterList'

const handleDelete = async (id: string) => {
  const filteredCharacter = await api.delete(`/users/${id}`)
  return filteredCharacter.data
}

export const ActionsSection = (params: IUser) => {
  return (
    <div style={{ display: 'flex' }}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => console.log(`Edit ${params._id}`)}
      >
        <ModeEditIcon />
      </Button>
      <BasicModal isDeleteOption textButton={<DeleteIcon color="error" />}>
        Você está prestes a deletar um usuário, deseja prosseguir?
        <button onClick={() => handleDelete(params._id)}>SIM</button>
      </BasicModal>
    </div>
  )
}

export const MoreInfoSection = (params: IUser) => {
  return (
    <BasicModal textButton="Lista de Personagens" textModalHeader={params.name}>
      {params.favoriteCharacters.length > 0 ? (
        <CharacterList {...params} />
      ) : (
        <p>TU NÃO TEM PERSONAGEM FAVORITO NÃO MERMAO</p>
      )}
    </BasicModal>
  )
}
