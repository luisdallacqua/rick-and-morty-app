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
import { makeStyles } from '@mui/styles'

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
      width: drawerWidth
    },
    root: {
      display: 'flex'
    },
    active: {
      background: '#f4f4f4'
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor: '#fafafa'
    },
    toolbar: theme.mixins?.toolbar
  }
})

const Layout: FC = ({ children }) => {
  const classes = useStyles()
  const router = useRouter()

  const menuItems = [
    {
      text: 'My characters',
      icon: <SubjectOutlined color="secondary" />,
      path: '/'
    },
    {
      text: 'Create User',
      icon: <AddCircleOutlined color="secondary" />,
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
            <Avatar
              src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
              sx={{ width: 56, height: 56 }}
            />
            <Box>
              <Typography color="black">Jorge Ben Jor</Typography>
              <Typography color="gray">ADMIN</Typography>
            </Box>
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
          <Typography variant="h5">Rick and Morty App</Typography>
        </div>
        {/* list / links */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              // onClick={() => router.push(item.path)}
              // className={router.pathname == item.path ? classes.active : ''}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}

export default Layout
