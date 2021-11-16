import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, makeStyles } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'

import BasicModal from '../Modal/index'

import { userMock } from '../../mocks/user'
import CharacterCard, { CharacterProps } from '../CharecterCard'

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

const rows = [
  createData(
    userMock[0].name,
    userMock[0].email,
    userMock[0].role,
    <>
      <Button variant="outlined" size="small">
        <ModeEditIcon />
      </Button>
      <Button variant="outlined" size="small" color="error">
        <DeleteIcon />
      </Button>
    </>,
    <BasicModal textButton="More info" textModalHeader={userMock[0].name}>
      {userMock[0].favoriteCharacters.map((character) => (
        <CharacterCard
          key={character.name}
          name={character.name}
          status={character.status}
          species={character.species}
          image={character.image}
          location={character.location}
          origin={character.origin}
        />
      ))}
    </BasicModal>,
    userMock[0].avatar
  ),
  createData(
    userMock[1].name,
    userMock[1].email,
    userMock[1].role,
    <>
      <Button variant="outlined" size="small">
        <ModeEditIcon />
      </Button>
      <Button variant="outlined" size="small" color="error">
        <DeleteIcon />
      </Button>
    </>,
    <BasicModal textButton="More info" textModalHeader={userMock[1].name}>
      {userMock[1].favoriteCharacters.map((character) => (
        <CharacterCard
          key={character.name}
          name={character.name}
          status={character.status}
          species={character.species}
          image={character.image}
          location={character.location}
          origin={character.origin}
        />
      ))}
    </BasicModal>,
    userMock[1].avatar
  )
]

export default function BasicTable() {
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
            <StyledTableCell align="left">Mais Info</StyledTableCell>
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
