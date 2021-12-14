import { Avatar, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { IUser } from '../RegisterForm/types'

import imageDefault from '../../../public/grayUserImage.svg'
const UserPage = (user: IUser) => {
  if (Object.keys(user).length === 0) return <div>Loading...</div>

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
      <Stack>
        <Image src={imageDefault} width={200} height={200} />
      </Stack>
      <Stack sx={{ marginLeft: '1rem' }}>
        <Typography variant="h2">{user.name}</Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">Role: {user.role}</Typography>
        <Typography variant="h6">Birth Date:{user.birthDate}</Typography>
        <Typography variant="h6">CPF: {user.cpf}</Typography>
      </Stack>
    </Stack>
  )
}

export default UserPage
