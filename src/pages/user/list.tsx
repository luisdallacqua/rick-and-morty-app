import { Grid } from '@mui/material'
import React from 'react'
import BasicTable from '../../components/UserList'

const List = () => {
  return (
    <Grid container justifyContent="center" spacing={2} my={3}>
      <Grid item lg={11} md={8} sm={6}>
        <BasicTable />
      </Grid>
    </Grid>
  )
}

export default List
