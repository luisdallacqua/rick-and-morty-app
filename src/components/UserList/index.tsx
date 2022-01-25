import { useEffect, useState } from 'react'
import Image from 'next/image'
import { api } from '../../services/createApi'
import { IUser } from '../RegisterForm/types'
import imageDefault from '../../../public/grayUserImage.svg'
import { headerColumns, rowsFormatter } from './userData'
import { Alert, CircularProgress } from '@mui/material'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { formatStringToFillInSpace } from '../../utils/data/formatData'
import TablePagination from '@mui/material/TablePagination'
import { useRemoteService } from '../../hooks/useRemoteService'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    textTransform: 'uppercase'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const maxSizeAvatar = {
  maxWidth: '60px',
  maxHeight: '60px'
}

const sizeOfNameToTrim = 30

export default function BasicTable() {
  const { data, loading, error } = useRemoteService(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/user`
  )

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const rowsData = rowsFormatter(data)

  return (
    <Paper>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: '90vw', overflow: 'auto' }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow hover={true}>
              {headerColumns.map((column) => (
                <StyledTableCell key={column}>{column}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {error && (
              <Alert severity="error">{'There is an error, try again'}</Alert>
            )}
            {loading && !error ? (
              <TableCell>
                <CircularProgress />
              </TableCell>
            ) : (
              rowsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:nth-child(even)': { backgroundColor: '#eee' }
                    }}
                  >
                    <TableCell align="center">
                      {row.avatar ? (
                        <img src={row.avatar} style={maxSizeAvatar} />
                      ) : (
                        <Image src={imageDefault} width={60} height={60} />
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {formatStringToFillInSpace(row.name, sizeOfNameToTrim)}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.role.toUpperCase()}</TableCell>
                    <TableCell align="left">{row.actions}</TableCell>
                    <TableCell align="left">{row.moreInfo}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rowsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
