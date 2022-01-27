import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { pink } from '@mui/material/colors'

interface IStatus {
  //this is necessary to makeStyles accept status without any kind of error
  status: string
}

export const useStyles = makeStyles<Theme, IStatus>((theme) => {
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
