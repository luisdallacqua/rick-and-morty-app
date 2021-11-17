import { Grid, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import RegisterForm from '../../components/RegisterForm'

const useStyles = makeStyles((theme: Theme) => {
  return {
    grid: {
      backgroundColor: theme.palette.common.white,
      padding: '3rem 1rem',
      margin: '2rem auto',
      borderRadius: '1rem'
    }
  }
})

const Register = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={10} className={classes.grid}>
        <Typography align="center" variant="h5" my={2}>
          Criar novo usuário
        </Typography>
        <RegisterForm />
      </Grid>
    </Grid>
  )
}

export default Register