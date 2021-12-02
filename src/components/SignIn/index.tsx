import { useState } from 'react'
import { Avatar, Container, Grid, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#000',
    paddingTop: '1rem'
  }
})

const SignIn = () => {
  const classes = useStyles()

  const auth = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(values: { email: string; password: string }) {
    try {
      await auth.authenticate(values.email, values.password)

      router.push('/char')
      console.log(values.email, values.password)
    } catch (error) {
      console.log(error)
    }
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
        <Box
          component="form"
          noValidate
          onSubmit={() => onSubmit({ email, password })}
        >
          <TextField
            fullWidth
            margin="normal"
            label="User"
            variant="outlined"
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => onSubmit({ email, password })}
          >
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
