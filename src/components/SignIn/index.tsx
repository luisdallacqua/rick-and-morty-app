import { Avatar, Container, Grid, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useForm } from 'react-hook-form'
import { IUser } from '../RegisterForm/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../utils/validation/userValidation'
import axios from 'axios'
import { useState } from 'react'

import { signIn, getSession } from 'next-auth/client'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#000',
    paddingTop: '1rem'
  }
})

const SignIn = () => {
  const router = useRouter()
  const classes = useStyles()

  const [message, setMessage] = useState<any>(null)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Pick<IUser, 'email' | 'password'>>({
    resolver: yupResolver(loginSchema)
  })

  async function onSubmit(values: { email: string; password: string }) {
    // const response = await axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/api/login',
    //   data: {
    //     email: values.email,
    //     password: values.password
    //   }
    // })

    const response = signIn('credentials', {
      email: values.email,
      password: values.password
    })

    console.log({ response })

    const session = await getSession()

    console.log({ session })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {message?.message && message.message}
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            type="text"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password')}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/user/register">
                <a className={classes.link}>{'Não possue conta? Crie uma.'}</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignIn
