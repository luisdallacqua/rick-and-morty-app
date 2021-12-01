import * as React from 'react'
import Image from 'next/image'
import { api } from '../../services/createApi'
import { IUser } from '../RegisterForm'
import imageDefault from '../../../public/grayUserImage.svg'
import { rows } from './userData'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { formatStringToFillInSpace } from '../../utils/data/formatData'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const sizeOfName = 30

export default function BasicTable() {
  const [users, setUsers] = React.useState<IUser[] | []>([])

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get('/users')
      const data = await response.data
      setUsers(data)
    }
    fetchUsers()
  }, [])

  const rowsData = rows(users)

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: '90vw', overflow: 'auto' }}
    >
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#ccc' }}>
          <TableRow hover={true}>
            <StyledTableCell align="center">Avatar</StyledTableCell>
            <StyledTableCell>Usuário</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Permissão</StyledTableCell>
            <StyledTableCell align="left">Ações (U,D)</StyledTableCell>
            <StyledTableCell align="left">
              Personagens Favoritos
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:nth-child(even)': { backgroundColor: '#eee' }
              }}
            >
              <TableCell align="center">
                {row.avatar ? (
                  <img
                    src={row.avatar}
                    style={{
                      maxWidth: '60px',
                      maxHeight: '60px'
                    }}
                  />
                ) : (
                  <Image src={imageDefault} width={60} height={60} />
                )}
              </TableCell>
              <TableCell component="th" scope="row">
                {formatStringToFillInSpace(row.name, sizeOfName)}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.roles.toUpperCase()}</TableCell>
              <TableCell align="left">{row.actions}</TableCell>
              <TableCell align="left">{row.moreInfo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
