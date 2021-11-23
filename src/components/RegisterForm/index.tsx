import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import UploadFile from '../UploadFile'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from '../../utils/validation/userValidation'

export interface IUser {
  id: number
  name: string
  password: string
  cpf: string
  email: string
  birthDate: string
  role: string
  image: string
}

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IUser>({ resolver: yupResolver(userSchema) })

  const [role, setRole] = useState('user')
  const [image, setImage] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string)
  }

  const createUser = async (user: IUser) => {
    const response = await axios.post('http://localhost:3001/users', user)
    return response.data
  }

  const onSubmit = (data: IUser) =>
    createUser({ ...data, role, image, id: Math.random() * 100 })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <UploadFile src={image} onChange={(e) => setImage(e)} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Nome"
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            {...register('name')}
          />
          <TextField
            fullWidth
            type="password"
            label="Senha"
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
          <TextField
            fullWidth
            label="CPF"
            error={Boolean(errors.cpf?.message)}
            helperText={errors.cpf?.message}
            {...register('cpf')}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Data de Nascimento"
            error={Boolean(errors.birthDate?.message)}
            helperText={errors.birthDate?.message}
            {...register('birthDate')}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Permissão do usuário
            </InputLabel>
            <Select
              label=" Permissão do usuário"
              defaultValue="user"
              value={role}
              onChange={handleChange}
            >
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="user">user</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button variant="contained" color="secondary" type="submit">
          REGISTER
        </Button>
      </Stack>
    </form>
  )
}

export default RegisterForm
