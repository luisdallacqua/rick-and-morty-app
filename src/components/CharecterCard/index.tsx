import React, { FC, useState } from 'react'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { pink } from '@mui/material/colors'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

export type CharacterProps = {
  name: string
  status: string
  species: string
  image: string
  location: { name: string; link?: string }
  origin: { name: string }
}

const cardStyle = {
  maxWidth: 500,
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FiberManualRecordIcon
              sx={{
                fontSize: 10,
                color: status === 'Alive' ? 'secondary.main' : 'error.main'
              }}
            />

            <Typography variant="subtitle1" component="div">
              {status} - {species}
            </Typography>
          </div>
          <Box>
            <Typography variant="subtitle2">First Seen:</Typography>
            <Typography variant="body2"> {origin?.name}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}
          >
            <Box>
              <Typography variant="subtitle2">Last Seen:</Typography>
              <Typography variant="body2"> {location?.name}</Typography>
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
