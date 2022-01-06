import { CircleOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { NextPageContext } from 'next'
import React from 'react'
import { IUser } from '../../components/RegisterForm/types'
import BasicTable from '../../components/UserList'
import { api } from '../../services/createApi'

export default function List(users: IUser[]) {
  return (
    <Grid container justifyContent="center" spacing={2} my={3}>
      <Grid item lg={11} md={8} sm={6}>
        <BasicTable />
        {console.log(users)}
      </Grid>
    </Grid>
  )
}

export async function getStaticProps(ctx: NextPageContext) {
  // const cookie = ctx.req?.headers.cookie
  // , { headers: { cookie: cookie! } }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const response = await api.get('user')
  const data = await response.data

  return {
    props: {
      users: data
    }
  }
}
