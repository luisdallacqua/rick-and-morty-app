import { FC } from 'react'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  gridWrapper: {
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem'
  },
  text: {
    marginBottom: '1rem'
  }
})

const SignIn: FC = () => {
  const classes = useStyles()

  return (
    <Grid
      xs={10}
      md={6}
      container
      spacing={2}
      justifyContent="center"
      className={classes.gridWrapper}
    >
      <Grid item xs={8} md={6}>
        <Typography variant="h4" align="center">
          Sign In
        </Typography>
        <form className={classes.form}>
          <TextField
            className={classes.text}
            label="User"
            variant="outlined"
            type="text"
          />
          <TextField
            className={classes.text}
            label="Password"
            variant="outlined"
            type="password"
          />
          <Button variant="contained" color="primary">
            Sign In
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default SignIn
