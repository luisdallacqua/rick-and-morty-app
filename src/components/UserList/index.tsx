import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, makeStyles } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'

function createData(
  name: string,
  email: string,
  roles: string,
  actions: React.ReactNode,
  moreInfo: React.ReactNode,
  avatar?: string
) {
  return { name, email, roles, actions, moreInfo, avatar }
}

const rows = [
  createData(
    'Jorge Ben',
    'algum@mail.com',
    'ADMIN',
    <>
      <Button variant="outlined" size="small">
        <ModeEditIcon />
      </Button>
      <Button variant="outlined" size="small" color="error">
        <DeleteIcon />
      </Button>
    </>,
    <Button variant="contained" size="small">
      More Info
    </Button>,
    'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  ),
  createData(
    'Jorge Ben',
    'algum@mail.com',
    'ADMIN',
    <>
      <Button variant="outlined" size="small">
        <ModeEditIcon />
      </Button>
      <Button variant="outlined" size="small" color="error">
        <DeleteIcon />
      </Button>
    </>,
    <Button variant="contained" size="small">
      More Info
    </Button>
  )
]

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#ccc' }}>
          <TableRow hover={true}>
            <TableCell>Usuário</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Avatar</TableCell>
            <TableCell align="left">Permissão</TableCell>
            <TableCell align="left">Ações (U,D)</TableCell>
            <TableCell align="left">Mais Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:nth-child(even)': { backgroundColor: '#eee' }
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">
                {row.avatar ? (
                  <img
                    src={row.avatar}
                    style={{
                      maxWidth: '60px',
                      maxHeight: '60px',
                      borderRadius: '50%'
                    }}
                  />
                ) : (
                  'No image'
                )}
              </TableCell>
              <TableCell align="left">{row.roles}</TableCell>
              <TableCell align="left">{row.actions}</TableCell>
              <TableCell align="left">{row.moreInfo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
