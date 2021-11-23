import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import rickAndMorty from '../../../public/RickAndMorty.png'

import { AddCircleOutlined, SubjectOutlined } from '@mui/icons-material'
import GroupIcon from '@mui/icons-material/Group'

import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Stack,
  Theme
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import UserDropdown from '../UserDropdown'
import { grey } from '@mui/material/colors'
import { Box } from '@mui/system'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => {
  return {
    page: {
      background: grey[200],
      width: '100%',
      padding: '1rem',
      minHeight: '100vh'
    },
    drawer: {
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
    root: {
      display: 'flex'
    },
    active: {
      background: theme.palette.common.white,
      color: theme.palette.secondary.main,
      borderLeft: `.5rem solid ${theme.palette.secondary.main}`
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor: theme.palette.common.white,
      opacity: '0.95'
    },
    toolbar: theme.mixins.toolbar
  }
})

const Layout: FC = ({ children }) => {
  const classes = useStyles()
  const router = useRouter()

  const menuItems = [
    {
      text: 'My characters',
      icon: <SubjectOutlined color="secondary" />,
      path: '/char'
    },
    {
      text: 'Create User',
      icon: <AddCircleOutlined color="secondary" />,
      path: '/user/register'
    },
    {
      text: 'List of User',
      icon: <GroupIcon color="secondary" />,
      path: '/user/list'
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
            backgroundColor: 'common.white'
          }}
        >
          <Stack
            sx={{
              borderRadius: '1rem',
              cursor: 'pointer'
            }}
            direction="row"
            alignItems="center"
            spacing={2}
            mx={3}
            p={2}
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
        <Image
          alt="Rick and morty logo"
          src={rickAndMorty}
          width={300}
          height={100}
        />

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
        <Box>
          <Typography variant="body2" align="center">
            Develop by luisdallacqua with &#9829;
          </Typography>
        </Box>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}

export default Layout
