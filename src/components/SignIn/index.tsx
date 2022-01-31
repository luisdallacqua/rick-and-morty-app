import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Alert,
  Avatar,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IUser } from '../RegisterForm/types'
import { loginSchema } from '../../utils/validation/userValidation'

import { signIn } from 'next-auth/client'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#0066c0',
    paddingTop: '1rem'
  }
})

const SignIn = () => {
  const router = useRouter()
  const classes = useStyles()

  const [message, setMessage] = useState<any>('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Pick<IUser, 'email' | 'password'>>({
    resolver: yupResolver(loginSchema)
  })

  async function onSubmit(values: { email: string; password: string }) {
    setIsLoading(true)
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (response?.error) {
      setMessage(response.error)
      setIsLoading(false)
    }

    if (!response?.error) {
      router.replace(`/`)
      setIsLoading(false)
    }
  }

  return (
    <>
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
          {message && (
            <Alert severity="error">
              {message === 'Request failed with status code 401'
                ? 'You are not authorize, login and password did not match'
                : message}
            </Alert>
          )}
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup">
                  <a className={classes.link}>
                    {'Do not have an account? Click here.'}
                  </a>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default SignIn
