import React, { useState } from 'react'
import UploadFile from '../UploadFile'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from '../../utils/validation/userValidation'
import { api } from '../../services/createApi'
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from '@mui/material'
import { IUser } from './types'

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<IUser>({ resolver: yupResolver(userSchema) })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isSucess, setIsSucess] = useState(false)

  const [role, setRole] = useState('user')
  const [image, setImage] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string)
  }

  const createUser = async (user: IUser) => {
    const response = await api.post('/signup', user)
    return response.data
  }

  const onSubmit = async (data: IUser) => {
    setIsLoading(true)
    setIsSucess(false)
    setError(false)
    try {
      await createUser({
        ...data,
        role,
        avatar: image
      })
      setIsSucess(true)
      reset()
    } catch (error) {
      setError(true)
    }
    setIsLoading(false)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Link to Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Name"
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            {...register('name')}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              label=" Role"
              defaultValue="user"
              value={role}
              onChange={handleChange}
            >
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="user">user</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={isLoading}
        >
          {!isLoading ? (
            'REGISTER'
          ) : (
            <CircularProgress sx={{ color: '#fafafa' }} />
          )}
        </Button>
        {isSucess && (
          <Alert severity="success">The user was creted sucessfully</Alert>
        )}

        {error && (
          <Alert severity="error">
            Something went wrong with our server— Try again later!
          </Alert>
        )}
      </Stack>
    </form>
  )
}

export default RegisterForm
