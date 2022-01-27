import { Alert, Button } from '@mui/material'
import BasicModal from '../../components/Modal'
import { IUser } from '../../components/RegisterForm/types'

import DeleteIcon from '@mui/icons-material/Delete'
import { api } from '../../services/createApi'
import CharacterList from '../../components/CharacterList'
import { useAuth } from '../../hooks/useAuth'

export const ActionsSection = (params: IUser) => {
  const auth = useAuth()

  const isAdmin = auth.role?.toLocaleLowerCase() === 'admin'
  const canDelete = params.role?.toLocaleLowerCase() === 'admin'

  async function handleDelete(id: string) {
    try {
      const response = await api.delete(`/user`, { data: { _id: id } })
      console.log(response.data)
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <BasicModal
      color="error"
      isDeleteOption
      disabled={!isAdmin}
      textButton={
        <DeleteIcon sx={{ color: isAdmin ? 'error' : 'gray[500]' }} />
      }
    >
      {canDelete ? (
        <Alert severity="error">You cannot delete this admin</Alert>
      ) : (
        <>
          <Alert severity="warning">
            You are deleting an user, and will not be possible recover any
            information about this user.
          </Alert>
          <Button
            disabled={canDelete}
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => handleDelete(params._id)}
          >
            Delete
          </Button>
        </>
      )}
    </BasicModal>
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
