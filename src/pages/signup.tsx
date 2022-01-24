import { Grid, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { PublicRoute } from '../components/ProtectedRoute'
import RegisterForm from '../components/RegisterForm'
import FormUploader from '../components/UploadFile/FormUploader'

const useStyles = makeStyles((theme: Theme) => {
  return {
    grid: {
      padding: '3rem 1rem',
      margin: '2rem auto',
      borderRadius: '1rem'
    }
  }
})

const Signup = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={11} md={10} className={classes.grid}>
        <Typography align="center" variant="h5" my={2}>
          User Create
        </Typography>
        <RegisterForm />
      </Grid>
    </Grid>
  )
}

export default PublicRoute(Signup)
