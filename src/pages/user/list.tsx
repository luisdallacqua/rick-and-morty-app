import { CircleOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { GetServerSideProps, NextPageContext } from 'next'
import React from 'react'
import authRoute from '../../components/ProtectedRoute'
import { IUser } from '../../components/RegisterForm/types'
import BasicTable from '../../components/UserList'
import { api } from '../../services/createApi'

function List() {
  return (
    <Grid container justifyContent="center" spacing={2} my={3}>
      <Grid item lg={11} md={8} sm={6}>
        <BasicTable />
      </Grid>
    </Grid>
  )
}

export default authRoute(List)
