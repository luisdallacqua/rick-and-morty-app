import Link from 'next/link'
import Dropdown from '../Dropdown'

import { Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import styled from '@emotion/styled'

import * as S from './styles'

import { useRouter } from 'next/router'

export type UserDropdownProps = {
  username: string
  image?: string
  role?: string
}

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const UserRole = styled.span`
  font-size: 0.8rem;
  margin-left: 0.6rem;
`

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
          <UserWrapper>
            <S.Username>{username}</S.Username>
            <UserRole>{role?.toUpperCase() || 'USER'}</UserRole>
          </UserWrapper>

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
