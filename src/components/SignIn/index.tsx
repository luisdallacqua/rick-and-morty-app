import { FC, useState } from 'react'
import { Grid, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import { IUser } from '../RegisterForm'

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

const SignIn: FC = () => {
  const classes = useStyles()

  const [user, setUser] = useState('')
  const [result, setResult] = useState('')

  const logIn = async (logIn: string) => {
    try {
      const response = await axios.get('http://localhost:3001/users')
      const users = response.data
      const findUser = users.find((user: IUser) => user.name === logIn)
      const result = findUser ? findUser : 'não foi possível achar o usuário'
      setResult(result ? result.name : 'Não rolou')
      return result
    } catch (e) {
      console.log(e)
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
            value={user}
            onChange={(e: any) => setUser(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: '1' }}
            onClick={() => {
              logIn(user)
            }}
          >
            Sign In
          </Button>
          {result && <span>{result}</span>}
        </form>
      </Grid>
    </Grid>
  )
}

export default SignIn
