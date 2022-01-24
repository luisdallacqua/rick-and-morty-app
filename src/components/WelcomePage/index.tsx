import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import { useAuth } from '../../hooks/useAuth'

const featuresOptions = [
  {
    title: 'Rick and Morty Characters',
    content:
      'You can navigate through the app and choose your favorite Characters of Rick and Morty'
  },
  {
    title: 'Other Users',
    content: 'You can see to other users and what are their favorite characters'
  },
  {
    title: 'Your Profile',
    content:
      'You can see informations of your account and edit your profile, like your name, email, etc'
  }
]

function WelcomePage() {
  const auth = useAuth()

  return (
    <>
      <Container maxWidth="lg">
        <Typography align="center" variant="h5" mt={2}>
          Welcome {auth.name}, what you can do in this app?
        </Typography>
        <Grid container spacing={3} mt={3}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {featuresOptions.map((feature) => {
              return (
                <>
                  <ListItem alignItems="flex-start" key={feature.title}>
                    <ListItemText
                      primary={feature.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {feature.content}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider />
                </>
              )
            })}
          </List>
        </Grid>
      </Container>
    </>
  )
}

export default WelcomePage
