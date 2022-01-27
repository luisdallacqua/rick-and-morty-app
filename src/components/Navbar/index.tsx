import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from '@emotion/styled'

export const StyledLink = styled('a')({
  textDecoration: 'none',
  color: '#fff',
  border: '1px solid #fff',
  padding: '0.5rem 1rem',
  borderRadius: '.5rem',
  [`&:hover`]: {
    backgroundColor: '#fff',
    color: '#000'
  }
})

export default function Navbar() {
  const router = useRouter()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: '#121416'
          }}
        >
          <Button>
            {router.pathname === '/login' ? (
              <Link href="/signup">
                <StyledLink>Register</StyledLink>
              </Link>
            ) : (
              <Link href="/login">
                <StyledLink>Login</StyledLink>
              </Link>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
// background: #fff;
// color: #121416;
// padding: 0.8rem 1rem;
// &:hover {
//   background: theme.colors.primary;
//   color: #fafafa;
// }
