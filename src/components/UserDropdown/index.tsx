import Link from 'next/link'
import Dropdown from '../Dropdown'

import { Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import * as S from './styles'

import { signOut } from 'next-auth/client'

export type UserDropdownProps = {
  username: string
  image?: string
  role?: string
}

const UserDropdown = ({ username, image, role }: UserDropdownProps) => {
  return (
    <Dropdown
      title={
        <>
          <KeyboardArrowDownIcon />
          <S.UserWrapper>
            <S.Username>{username}</S.Username>
            <S.UserRole>{role?.toUpperCase() || 'USER'}</S.UserRole>
          </S.UserWrapper>

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
          <S.Link
            title="Sign out"
            onClick={() =>
              signOut({
                callbackUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/login`
              })
            }
          >
            <ExitToAppIcon />
            <span>Sign out</span>
          </S.Link>
        </Link>
      </S.Nav>
    </Dropdown>
  )
}

export default UserDropdown
