import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { AddCircleOutlined, SubjectOutlined } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Stack,
  Theme
} from '@mui/material'
import { pink } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import UserDropdown from '../UserDropdown'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => {
  return {
    page: {
      background: '#eee',
      width: '100%',
      padding: '1rem'
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#121415',
      color: '#fafafa',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    root: {
      display: 'flex'
    },
    active: {
      background: '#fafafa',
      color: '#1db954'
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor: '#fafafa'
    },
    toolbar: {
      minHeight: 64
    }
  }
})

const Layout: FC = ({ children }) => {
  const classes = useStyles()
  const router = useRouter()

  const menuItems = [
    {
      text: 'My characters',
      icon: <SubjectOutlined sx={{ color: '#1db954' }} />,
      path: '/'
    },
    {
      text: 'Create User',
      icon: <AddCircleOutlined sx={{ color: '#1db954' }} />,
      path: '/char'
    }
  ]

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: '#fafafa'
          }}
        >
          <Stack
            sx={{
              padding: '1rem',
              borderRadius: '1rem',
              cursor: 'pointer'
            }}
            direction="row"
            alignItems="center"
            spacing={2}
            mx={3}
            py={2}
            onClick={() => {
              console.log('clicked')
            }}
          >
            <UserDropdown
              username="Luis Dallacqua"
              image="https://avatars.githubusercontent.com/u/65989058?v=4"
            />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* side drawer */}

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5">LOGO</Typography>
        </div>
        {/* list / links */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => router.push(item.path)}
              className={router.pathname == item.path ? classes.active : ''}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          ))}
        </List>
        <div>
          <Typography variant="body2" align="center">
            Develop by luisdallacqua with &#9829;
          </Typography>
        </div>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}

export default Layout
