import React, { FC } from 'react'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export type CharacterProps = {
  name: string
  status: string
  species: string
  image: string
  location: { name: string; link?: string }
  origin: { name: string }
}

const CharacterCard: FC<CharacterProps> = ({
  name,
  status,
  species,
  image,
  location,
  origin
}: CharacterProps) => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        display: 'flex',
        backgroundColor: 'rgb(60, 62, 68)',
        color: '#fafafa'
      }}
    >
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
            <FavoriteBorderIcon onClick={() => console.log('click')} />
          </Box>
        </CardContent>
      </Box>
    </Card>
  )
}

export default CharacterCard
