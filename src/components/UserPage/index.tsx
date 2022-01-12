import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'

import imageDefault from '../../../public/grayUserImage.svg'
import { UserProps } from '../../context/types'

const UserPage = (user: UserProps) => {
  if (Object.keys(user).length === 0) return <div>Loading...</div>

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
      <Stack>
        <Avatar
          src={user.picture || imageDefault}
          alt={user.name}
          variant="rounded"
          sx={{ width: '15rem', height: '15rem' }}
        />
      </Stack>
      <Stack sx={{ marginLeft: '1rem' }}>
        <Typography variant="h2">{user.name}</Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">Role: {user.role}</Typography>
      </Stack>
    </Stack>
  )
}

export default UserPage
