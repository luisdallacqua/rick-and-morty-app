import { Avatar, Typography } from '@mui/material'
import { signOut } from 'next-auth/client'
import React from 'react'
import { Link } from '../UserDropdown/styles'

function WelcomePage({ auth }: any) {
  console.log('welcome page session', auth)
  return (
    <>
      <Typography variant="h5">Welcome {auth.name}</Typography>

      <Typography variant="body1">
        This is an web app developed by Luis Dallacqua
      </Typography>
      <Typography variant="body2">
        You have the option to see all the characters of Rick and Morty in the
        page of
        <Link href="/char">
          <a>Characters</a>
        </Link>
      </Typography>
      <Typography variant="body2">
        You have the option to see all the users and their favorite characters
        in the page of
        <Link href="/user/list">
          <a>users</a>
        </Link>
      </Typography>
      <Typography variant="body2">
        Or you can see the details of your profile in my profile
        <Link href="/user/profile">
          <a>page</a>
        </Link>
      </Typography>
      <Typography variant="body2">
        If you want is possible to navigate with sidebar and top bar. Enjoy it
      </Typography>
      <button onClick={() => signOut()}>logout</button>
      {auth.name && <p>{auth.name}</p>}
      {auth.name && <p>{auth.role}</p>}
      {auth.name && <p>{auth.email}</p>}
      {auth.name && <p>{auth.sub}</p>}
      {auth.name && (
        <Avatar
          src={auth.picture}
          alt={auth.name}
          variant="rounded"
          sx={{ maxHeight: 60 }}
        />
      )}
    </>
  )
}

export default WelcomePage
