import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { AddCircleOutlined, SubjectOutlined } from '@mui/icons-material'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'

const drawerWidth = 240

const useStyles = makeStyles(() => {
  return {
    page: {
      background: '#f9f9f9',
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
    }
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
              onClick={() => router.push(item.path)}
              className={router.pathname == item.path ? classes.active : ''}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>{children}</div>
    </div>
  )
}

export default Layout
