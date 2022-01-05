import Link from 'next/link'
import Dropdown from '../Dropdown'

import { Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import * as S from './styles'

import { useRouter } from 'next/router'

export type UserDropdownProps = {
  username: string
  image?: string
  role?: string
}

const UserDropdown = ({ username, image, role }: UserDropdownProps) => {
  const router = useRouter()

  async function logoutAndRedirect() {
    router.push('/login')
  }

  return (
    <Dropdown
      title={
        <>
          <KeyboardArrowDownIcon />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <S.Username>{username}</S.Username>
            <span style={{ fontSize: '12px', marginLeft: '0.6rem' }}>
              {role?.toUpperCase() || 'USER'}
            </span>
          </div>

          {image ? (
            <Avatar
              src={image}
              alt={username}
              variant="rounded"
              sx={{ maxHeight: 60 }}
            />
          ) : (
            <PersonIcon sx={{ fontSize: 50 }} />
          )}
        </>
      }
    >
      <S.Nav>
        <Link href="/user/profile" passHref>
          <S.Link>
            <PersonIcon fontSize="small" />
            <span>My profile</span>
          </S.Link>
        </Link>

        <Link href="/" passHref>
          <S.Link title="Sign out" onClick={() => logoutAndRedirect()}>
            <ExitToAppIcon />
            <span>Sign out</span>
          </S.Link>
        </Link>
      </S.Nav>
    </Dropdown>
  )
}

export default UserDropdown
