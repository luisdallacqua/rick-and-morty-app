import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
const drawerWidth = 240

export const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appbar: {
      backgroundColor: theme.palette.grey[300],
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down('md')]: {
        width: '100vw'
      }
    },
    page: {
      width: '100%',
      minHeight: '100vh'
    },
    drawer: {
      flexShrink: 0,
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    active: {
      background: theme.palette.common.white,
      color: theme.palette.secondary.main,
      borderLeft: `.5rem solid ${theme.palette.secondary.main}`
    },
    toolbar: {
      ...theme.mixins.toolbar
    },
    menuButton: {
      color: '#000',
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    toolbarStyles: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  })
)
