import { FC } from 'react'
import { Grid, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'

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
          />
          <TextField
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
          />
          <Button variant="contained" color="primary" sx={{ margin: '1' }}>
            Sign In
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default SignIn
