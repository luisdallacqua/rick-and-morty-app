import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import UserDropdown from '../UserDropdown'
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
import { Box } from '@mui/system'

import { SubjectOutlined } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import GroupIcon from '@mui/icons-material/Group'
import { useAuth } from '../../hooks/useAuth'
import { useStyles } from './styles'

const menuItems = [
  {
    text: 'My characters',
    icon: <SubjectOutlined color="secondary" />,
    path: '/characters'
  },
  {
    text: 'List of User',
    icon: <GroupIcon color="secondary" />,
    path: '/user/list'
  }
]

const Dashboard: FC = ({ children }) => {
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const classes = useStyles()
  const router = useRouter()
  const auth = useAuth()

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(!open)
  }

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
        <Toolbar className={classes.toolbarStyles}>
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
              username={auth.name}
              image={auth.picture || ''}
              role={auth.role}
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
          <Typography align="center" variant="body1"></Typography>
        </Box>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Container>{children}</Container>
      </div>
    </div>
  )
}

export default Dashboard
