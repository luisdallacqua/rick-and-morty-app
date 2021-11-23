import React, { FC, useState } from 'react'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { pink } from '@mui/material/colors'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

export type CharacterProps = {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
  location: { name: string; link?: string }
  origin: { name: string }
}

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

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: 'common.black',
        color: 'common.white'
      }}
    >
      <CardMedia
        component="img"
        image={image}
        height="100%"
        alt="Live from space album cover"
      />

      <CardContent>
        <Typography variant="h5">{name}</Typography>

        <Typography variant="subtitle1" component="div">
          <FiberManualRecordIcon
            sx={{
              fontSize: 10,
              color: status === 'Alive' ? 'secondary.main' : 'error.main'
            }}
          />
          {status} - {species}
        </Typography>

        <Typography variant="subtitle2" mt={1}>
          Gender: {gender}
        </Typography>
        <Typography variant="subtitle2" mt={1}>
          First Seen: {origin?.name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle2">
            Last Seen: {location?.name}
          </Typography>
          <Box
            onClick={() => {
              setIsFavorite(!isFavorite)
              console.log(`Favorite ${id}`)
            }}
            mr={1}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: pink[500] }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: pink[500] }} />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
