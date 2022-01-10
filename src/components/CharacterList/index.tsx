import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

import { CharacterProps } from '../CharecterCard/types'
import { useRemoteService } from '../../hooks/useRemoteService'
import { Alert, AlertTitle, CircularProgress } from '@mui/material'

const CharacterList = ({ favoriteCharacters }: any) => {
  const { data, loading, error } = useRemoteService(
    `https://rickandmortyapi.com/api/character/${favoriteCharacters}`
  )
  if (loading) return <CircularProgress />
  if (error)
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Something went wrong with server. try again later.
      </Alert>
    )

  return (
    <>
      {data.map((character: CharacterProps) => {
        return (
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            key={character.id}
          >
            <ListItem
              alignItems="flex-start"
              sx={{
                marginBottom: '.3rem',
                border: '.1rem solid #1db954',
                borderRadius: '.5rem',
                backgroundColor: '#f5f5f5'
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={`image of ${character.name}`}
                  src={character.image}
                  sx={{ width: 60, height: 60, marginRight: '.5rem' }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${character.name} - ${character.species}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="common.black"
                    >
                      <FiberManualRecordIcon
                        sx={{
                          fontSize: 10,
                          color:
                            character.status === 'Alive'
                              ? 'secondary.main'
                              : 'error.main'
                        }}
                      />
                      {character.status}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        )
      })}
    </>
  )
}

export default CharacterList
