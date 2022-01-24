import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Navbar() {
  const router = useRouter()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
                <a style={{ textDecoration: 'none', color: '#fff' }}>
                  Register
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a style={{ textDecoration: 'none', color: '#fff' }}>Login</a>
              </Link>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
