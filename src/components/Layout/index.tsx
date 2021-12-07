import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import UserDropdown from '../UserDropdown'
import { useAuth } from '../../hooks/useAuth'
import rickAndMorty from '../../../public/RickAndMorty.png'

import Image from 'next/image'
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
  Theme,
  Container,
  IconButton,
  useMediaQuery
} from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { Box } from '@mui/system'

import { AddCircleOutlined, SubjectOutlined } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import GroupIcon from '@mui/icons-material/Group'

const drawerWidth = 240

const useStyles = makeStyles<Theme>((theme) =>
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
    }
  })
)

const toolbarStyles = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const Layout: FC = ({ children }) => {
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const classes = useStyles()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(!open)
  }

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

  const drawer = (
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
  )

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar className={classes.appbar} elevation={0} position="fixed">
        <Toolbar sx={toolbarStyles}>
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              borderRadius: '1rem',
              justifyContent: { xs: 'space-between', md: 'flex-end' }
            }}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              sx={{
                cursor: 'pointer'
              }}
              onClick={handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <UserDropdown
              username="Luis Artur"
              image="https://avatars.githubusercontent.com/u/65989058?v=4"
              role="Admin"
            />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* side drawer */}

      <Drawer
        className={classes.drawer}
        variant={isMdUp ? 'permanent' : 'temporary'}
        anchor="left"
        open={open}
        onClose={handleDrawerOpen}
        classes={{ paper: classes.drawerPaper }}
      >
        <Image
          alt="Rick and morty logo"
          src={rickAndMorty}
          width={300}
          height={100}
        />
        {/* list / links */}
        {drawer}
        <Box>
          <Typography variant="h6">Projeto e etc</Typography>
        </Box>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Container>{children}</Container>
      </div>
    </div>
  )
}

export default Layout
