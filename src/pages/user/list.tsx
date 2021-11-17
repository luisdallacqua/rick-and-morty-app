import { Grid } from '@mui/material'
import React from 'react'
import { UserListDefault } from '../../components/UserList/index.stories'

const List = () => {
  return (
    <Grid container justifyContent="center" spacing={2} my={3}>
      <Grid item lg={11} md={8} sm={6}>
        <UserListDefault />
      </Grid>
    </Grid>
  )
}

export default List
