import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { userUpdateSchema } from '../../utils/validation/userValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '../../services/createApi'
import { ProfileProps } from '../../pages/user/profile'
import { useAuth } from '../../hooks/useAuth'

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

type FormData = Omit<ProfileProps, 'picture'>

const AccountProfileDetails = (user: FormData) => {
  const auth = useAuth()
  const { _id } = user

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileProps>({
    resolver: yupResolver(userUpdateSchema)
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isSucess, setIsSucess] = useState(false)

  const [role, setRole] = useState(user.role)

  const handleChange = (event: any) => {
    setRole(event.target.value)
  }

  const isAdmin = user.role?.toLocaleLowerCase() === 'admin'

  async function updateUserOnDB(values: FormData) {
    const response = await api.patch('/user', {
      ...values,
      _id,
      role
    })
    auth.setUser((prev) => ({
      ...prev,
      name: response.data.user.name,
      email: response.data.user.email,
      role: response.data.user.role
    }))
    return response.data
  }

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    setIsSucess(false)
    setError(false)
    try {
      await updateUserOnDB({
        ...values,
        role
      })
      setIsSucess(true)
    } catch (error) {
      setError(true)
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                error={Boolean(errors.name?.message)}
                helperText={errors.name?.message}
                defaultValue={user.name}
                {...register('name')}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email')}
                defaultValue={user.email}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                disabled={!isAdmin}
                helperText={!isAdmin ? 'Only admins can change this' : ''}
                fullWidth
                label="Role"
                name="role"
                value={role}
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
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
          <Button color="primary" variant="contained" type="submit">
            {!isLoading ? (
              'Save details'
            ) : (
              <CircularProgress sx={{ color: '#fff' }} />
            )}
          </Button>
        </Box>
        {isSucess && (
          <Alert severity="success">The user was updated sucessfully</Alert>
        )}
        {error && (
          <Alert severity="error">
            Something went wrong with our server— Try again later!
          </Alert>
        )}
      </Card>
    </form>
  )
}
export default AccountProfileDetails
