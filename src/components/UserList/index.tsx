import * as React from 'react'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'

import imageDefault from '../../../public/grayUserImage.svg'

import BasicModal from '../Modal/index'

import { CharacterProps } from '../CharecterCard'
import CharacterList from '../CharacterList'
import axios from 'axios'
import { IUser } from '../RegisterForm'

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

function createData(
  name: string,
  email: string,
  roles: string,
  actions: React.ReactNode,
  moreInfo: React.ReactNode,
  avatar?: string,
  favoriteCharacters?: CharacterProps[]
) {
  return { name, email, roles, actions, moreInfo, avatar, favoriteCharacters }
}

export default function BasicTable() {
  const [users, setUsers] = React.useState<IUser[] | []>([])

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3001/users')
      const data = await response.data
      setUsers(data)
    }
    fetchUsers()
  }, [])

  const rows = users.map((user) => {
    return createData(
      user.name,
      user.email,
      user.role,
      <>
        <Button
          variant="outlined"
          size="small"
          onClick={() => console.log(`Edit ${user.id}`)}
        >
          <ModeEditIcon />
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => console.log(`Delete ${user.id}`)}
        >
          <DeleteIcon />
        </Button>
      </>,
      <BasicModal textButton="Lista de Personagens" textModalHeader={user.name}>
        <CharacterList />
      </BasicModal>,
      user.image
    )
  })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#ccc' }}>
          <TableRow hover={true}>
            <StyledTableCell>Usuário</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Avatar</StyledTableCell>
            <StyledTableCell align="left">Permissão</StyledTableCell>
            <StyledTableCell align="left">Ações (U,D)</StyledTableCell>
            <StyledTableCell align="left">
              Personagens Favoritos
            </StyledTableCell>
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
                      maxHeight: '60px'
                    }}
                  />
                ) : (
                  <Image src={imageDefault} width={60} height={60} />
                )}
              </TableCell>
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
