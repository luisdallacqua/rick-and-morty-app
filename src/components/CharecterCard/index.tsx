/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC, memo, useState } from 'react'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { CharacterProps } from './types'
import { formatStringToFillInSpace } from '../../utils/data/formatData'
import { updateFavoriteChars } from '../../utils/data/updateFavoriteCharacters'
import { useAuth } from '../../hooks/useAuth'
import { useStyles } from './styles'

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
