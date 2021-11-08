import React, { FC } from 'react'

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { green, red, grey } from '@material-ui/core/colors'

export type CharacterProps = {
  name: string
  status: string
  image: string
  location: { name: string; link?: string }
  origin: { name: string }
}

const useStyles = makeStyles({
  card: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#cecece',
    color: '#121416',
    marginTop: '1rem'
  },
  image: {
    height: '100%',
    width: '30%',
    // borderRadius: '50%',
    marginLeft: '1rem'
  }
})

const CharacterCard: FC<CharacterProps> = ({
  name,
  status,
  image,
  location,
  origin
}: CharacterProps) => {
  const classes = useStyles()

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <CardMedia
          image={image}
          title="titulo"
          component="img"
          className={classes.image}
        />
        <CardContent>
          <Typography>{name}</Typography>
          <Typography>{status}</Typography>
          <Typography>Location : {location?.name}</Typography>
          <Typography>TA DE SACANAGEM</Typography>
          <Typography>Origin Location : {origin?.name}</Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default CharacterCard
