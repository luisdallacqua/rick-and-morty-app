import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'

function createData(
  name: string,
  email: string,
  roles: string,
  actions: React.ReactNode,
  moreInfo: React.ReactNode
) {
  return { name, email, roles, actions, moreInfo }
}

const rows = [
  createData(
    'Jorge Ben',
    'algum@mail.com',
    'ADMIN',
    <>
      <Button>
        <DeleteIcon />
      </Button>
      <Button sx={{ height: '24px' }} onClick={() => console.log('é o que?')}>
        <ModeEditIcon />
      </Button>
    </>,
    <Button variant="outlined">More Info</Button>
  ),
  createData(
    'Jorge Ben',
    'algum@mail.com',
    'ADMIN',
    <>
      <Button>
        <DeleteIcon />
      </Button>
      <Button sx={{ height: '24px' }} onClick={() => console.log('é o que?')}>
        <ModeEditIcon />
      </Button>
    </>,
    <Button variant="outlined">More Info</Button>
  ),
  createData(
    'Jorge Ben',
    'algum@mail.com',
    'ADMIN',
    <>
      <Button>
        <DeleteIcon />
      </Button>
      <Button sx={{ height: '24px' }} onClick={() => console.log('é o que?')}>
        <ModeEditIcon />
      </Button>
    </>,
    <Button variant="outlined">More Info</Button>
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
