import React, { FC, useState } from 'react'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { pink } from '@mui/material/colors'

export type CharacterProps = {
  name: string
  status: string
  species: string
  image: string
  location: { name: string; link?: string }
  origin: { name: string }
}

const cardStyle = {
  maxWidth: 600,
  display: 'flex',
  backgroundColor: 'rgb(60, 62, 68)',
  color: '#fafafa'
}

const CharacterCard: FC<CharacterProps> = ({
  name,
  status,
  species,
  image,
  location,
  origin
}: CharacterProps) => {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        image={image}
        alt="Live from space album cover"
        sx={{ width: '40%' }}
      />
      <Box
        sx={{
          display: 'flex',
          flex: '3 1 0%'
        }}
      >
        <CardContent
          sx={{
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h5">{name}</Typography>
          <Typography variant="subtitle1" component="div">
            {status} - {species}
          </Typography>
          <Box>
            <Typography variant="subtitle2">First Seen:</Typography>
            <Typography variant="body1"> {origin?.name}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant="subtitle2">Last Seen:</Typography>
              <Typography variant="body1"> {location?.name}</Typography>
            </Box>
            <Box onClick={() => setIsFavorite(!isFavorite)}>
              {isFavorite ? (
                <FavoriteIcon sx={{ color: pink[500] }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  )
}

export default CharacterCard
