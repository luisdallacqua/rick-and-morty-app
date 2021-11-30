import { useEffect, useState } from 'react'
import { Grid, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { IUser } from '../RegisterForm'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  gridWrapper: {
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem'
  }
})

const SignIn = () => {
  const classes = useStyles()

  const auth = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(values: { email: string; password: string }) {
    try {
      await auth.authenticate(values.email, values.password)

      console.log(values.email, values.password)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      className={classes.gridWrapper}
    >
      <Grid item xs={10} md={8}>
        <Typography variant="h4" align="center">
          Sign In
        </Typography>
        <form className={classes.form}>
          <TextField
            margin="normal"
            label="User"
            variant="outlined"
            type="text"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: '1' }}
            onClick={() => onSubmit({ email, password })}
          >
            Sign In
          </Button>
          {auth.email && (
            <span>
              {auth.email} e o id é {auth.id}
            </span>
          )}
          <span>algum@mail.com</span>
        </form>
      </Grid>
    </Grid>
  )
}

export default SignIn
