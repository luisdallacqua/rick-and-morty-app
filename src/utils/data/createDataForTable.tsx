import { Alert, Button } from '@mui/material'
import BasicModal from '../../components/Modal'
import { IUser } from '../../components/RegisterForm/types'

import DeleteIcon from '@mui/icons-material/Delete'
import { api } from '../../services/createApi'
import CharacterList from '../../components/CharacterList'
import { useAuth } from '../../hooks/useAuth'

const handleDelete = async (id: string) => {
  const filteredCharacter = await api.delete(`/users/${id}`)
  return filteredCharacter.data
}

export const ActionsSection = (params: IUser) => {
  const auth = useAuth()
  const isAdmin = auth.role?.toLocaleLowerCase() === 'admin'

  return (
    <div style={{ display: 'flex' }}>
      <BasicModal
        color="error"
        isDeleteOption
        disabled={!isAdmin}
        textButton={
          <DeleteIcon sx={{ color: isAdmin ? 'error' : 'gray[500]' }} />
        }
      >
        <Alert severity="warning">
          You are deleting an user, and will not be possible recover any
          information about this user.
        </Alert>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params._id)}
        >
          YES
        </Button>
      </BasicModal>
    </div>
  )
}

export const MoreInfoSection = (params: IUser) => {
  return (
    <BasicModal
      variant="contained"
      textButton="Favorite characters"
      textModalHeader={params.name}
    >
      {params.favoriteCharacters.length > 0 ? (
        <CharacterList {...params} />
      ) : (
        <Alert severity="warning">
          Do not have any favorite character yet.
        </Alert>
      )}
    </BasicModal>
  )
}
