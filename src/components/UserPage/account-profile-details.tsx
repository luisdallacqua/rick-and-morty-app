import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material'
import { UserProps } from '../../context/types'

const states = [
  {
    value: 'admin',
    label: 'admin'
  },
  {
    value: 'user',
    label: 'user'
  }
]

const AccountProfileDetails = (user: UserProps) => {
  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    state: user.role
  })

  const isAdmin = user.role === 'admin'

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                disabled={!isAdmin}
                helperText={!isAdmin ? 'Only admins can change this' : ''}
                fullWidth
                label="Role"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  )
}
export default AccountProfileDetails
