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
import { useForm } from 'react-hook-form'
import { userUpdateSchema } from '../../utils/validation/userValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProfileProps } from '../../pages/user/profile'
import { api } from '../../services/createApi'
import { useSession } from 'next-auth/client'

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
  const [session] = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileProps>({
    resolver: yupResolver(userUpdateSchema)
  })

  const [role, setRole] = useState(user.role)

  const handleChange = (event: any) => {
    setRole(event.target.value)
  }

  const isAdmin = user.role?.toLocaleLowerCase() === 'admin'

  async function onSubmit(values: FormData) {
    try {
      const response = await api.patch('/user', {
        _id: user._id,
        name: values.name,
        email: values.email,
        role
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be seen" title="Profile" />
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
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  )
}
export default AccountProfileDetails
