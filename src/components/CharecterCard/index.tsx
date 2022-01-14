/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC, memo, useState } from 'react'

import { Card, CardContent, CardMedia, Theme, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { pink } from '@mui/material/colors'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { makeStyles } from '@mui/styles'
import { CharacterProps } from './types'
import { formatStringToFillInSpace } from '../../utils/data/formatData'
import { updateFavoriteChars } from '../../utils/data/reqCharacters'
import { useAuth } from '../../hooks/useAuth'

interface IStatus {
  //this is necessary to makeStyles accept status without any kind of error
  status: string
}

const useStyles = makeStyles<Theme, IStatus>((theme) => {
  return {
    card: {
      maxWidth: '100%',
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    media: {
      height: '100%'
    },
    icon: {
      fontSize: 10,
      color: ({ status }) => {
        if (status === 'Alive') {
          return theme.palette.secondary.main
        }
        if (status === 'Dead') {
          return theme.palette.error.main
        } else {
          return theme.palette.grey[500]
        }
      }
    },
    favoriteIcon: {
      fontSize: 20,
      color: pink[500],
      cursor: 'pointer',
      marginRight: '0.5rem'
    },
    wrapperFavIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: '1rem'
    }
  }
})

const CharacterCard: FC<CharacterProps> = ({
  isFavorited,
  id,
  name,
  status,
  species,
  gender,
  image,
  location,
  origin
}) => {
  const auth = useAuth()
  const [isFavorite, setIsFavorite] = useState(isFavorited)
  const classes = useStyles({ status })

  async function includeInFavorites(id: number) {
    await updateFavoriteChars('add', id, auth.sub)
  }

  async function excludeFromFavorites(id: number) {
    await updateFavoriteChars('delete', id, auth.sub)
  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={image} component="img" />
      <CardContent>
        <Typography variant="h6">
          {formatStringToFillInSpace(name, 16)}
        </Typography>
        <Typography variant="subtitle2" component="div">
          <FiberManualRecordIcon
            aria-label="Rounded Icon"
            className={classes.icon}
          />
          {status} - {species}
        </Typography>

        <Typography variant="subtitle2" mt={1}>
          Gender: {gender}
        </Typography>
        <Typography variant="subtitle2" mt={1}>
          First Seen: {formatStringToFillInSpace(origin?.name, 16)}
        </Typography>
        <Typography variant="subtitle2" mt={1}>
          Last Seen:{formatStringToFillInSpace(location?.name, 16)}
        </Typography>

        <Box
          className={classes.wrapperFavIcon}
          onClick={() => {
            {
              isFavorite ? excludeFromFavorites(id) : includeInFavorites(id)
            }
            setIsFavorite(!isFavorite)
          }}
        >
          {isFavorite ? (
            <FavoriteIcon className={classes.favoriteIcon} />
          ) : (
            <FavoriteBorderIcon className={classes.favoriteIcon} />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default memo(CharacterCard)
