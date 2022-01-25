import { useSession } from 'next-auth/client'
import React, { useEffect, useState } from 'react'
import authRoute from '../../components/ProtectedRoute'
import AccountProfile from '../../components/UserPage/account-profile'
import AccountProfileDetails from '../../components/UserPage/account-profile-details'
import { UserProps } from '../../context/types'
import { useAuth } from '../../hooks/useAuth'
import { Box, Container, Grid, Typography } from '@mui/material'
import { api } from '../../services/createApi'

export interface ProfileProps {
  _id: string
  email: string
  name: string
  role: string
  picture?: string
}

const Profile = () => {
  const auth = useAuth()
  const userContext = {
    _id: auth.sub as string,
    email: auth.email,
    name: auth.name,
    role: auth.role as string,
    picture: auth.picture
  }

  const [user, setUser] = useState<ProfileProps>(userContext)

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile {...user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails {...user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default authRoute(Profile)
