import React, { FC, useState } from 'react'

import { Card, CardContent, CardMedia, Theme, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { pink } from '@mui/material/colors'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { makeStyles } from '@mui/styles'

export interface CharacterProps {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
  location: { name: string; link?: string }
  origin: { name: string }
}

interface IStatus {
  //this is necessary to makeStyles accept status without any kind of error
  status: string
}

const useStyles = makeStyles<Theme, IStatus>((theme) => {
  return {
    card: {
      maxWidth: 345,
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
      fontSize: 30,
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
  id,
  name,
  status,
  species,
  gender,
  image,
  location,
  origin
}: CharacterProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const classes = useStyles({ status })

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={image} component="img" />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1" component="div">
          <FiberManualRecordIcon className={classes.icon} />
          {status} - {species}
        </Typography>

        <Typography variant="subtitle2" mt={1}>
          Gender: {gender}
        </Typography>
        <Typography variant="subtitle2" mt={1}>
          First Seen: {origin?.name}
        </Typography>
        <Typography variant="subtitle2" mt={1}>
          Last Seen: {location?.name}
        </Typography>

        <Box
          className={classes.wrapperFavIcon}
          onClick={() => {
            setIsFavorite(!isFavorite)
            console.log(`Favorite ${id}`)
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

export default CharacterCard
