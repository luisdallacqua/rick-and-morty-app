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
import UploadFile from '../UploadFile'

const RegisterForm = () => {
  const [age, setAge] = useState('')
  const [image, setImage] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(image)
      }}
    >
      <Stack spacing={3}>
        <UploadFile src={image} onChange={(e) => setImage(e)} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField fullWidth label="Name" />
          <TextField fullWidth label="Usuário" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="CPF"
            error={true}
            helperText={age === '' ? 'Empty field!' : ' '}
          />
          <TextField fullWidth label="Email" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField fullWidth label="Data de Nascimento" />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Permissão do usuário
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label=" Permissão do usuário"
              onChange={handleChange}
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="USER">USER</MenuItem>
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
