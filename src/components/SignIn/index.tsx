import {
  Alert,
  Avatar,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useForm } from 'react-hook-form'
import { IUser } from '../RegisterForm/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../utils/validation/userValidation'
import { useState } from 'react'

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

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Pick<IUser, 'email' | 'password'>>({
    resolver: yupResolver(loginSchema)
  })

  async function onSubmit(values: { email: string; password: string }) {
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (response?.error) setMessage(response.error)

    if (!response?.error) router.replace(`/`)
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
        {message && (
          <Alert severity="error">Login and Password did not match</Alert>
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
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup">
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
