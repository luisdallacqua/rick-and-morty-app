import { Alert, Button } from '@mui/material'
import BasicModal from '../Modal'
import { IUser } from '../RegisterForm/types'

import CharacterList from '../CharacterList'
import { useAuth } from '../../hooks/useAuth'
import DeleteModal from '../Modal/DeleteModal'

export const ActionsSection = (params: IUser) => {
  const { isAdmin } = useAuth()
  console.log('section', params)
  console.log('admin', isAdmin)

  const canDelete = params.role?.toLocaleLowerCase() === 'admin'

  return <DeleteModal id={params._id} />
}

export const MoreInfoSection = (params: IUser) => {
  return (
    <BasicModal
      variant="contained"
      textButton="Favorite characters"
      textModalHeader={`Favorite characters of ${params.name}:`}
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
