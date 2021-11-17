import Link from 'next/link'
import Dropdown from '../Dropdown'

import { Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import StarsIcon from '@mui/icons-material/Stars'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import * as S from './styles'

export type UserDropdownProps = {
  username: string
  image?: string
}

const UserDropdown = ({ username, image }: UserDropdownProps) => (
  <Dropdown
    title={
      <>
        {image ? (
          <Avatar src={image} alt={username} variant="rounded" />
        ) : (
          <PersonIcon />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <S.Username>{username}</S.Username>
          <span style={{ fontSize: '16px', marginLeft: '0.6rem' }}>Admin</span>
        </div>
        <KeyboardArrowDownIcon />
      </>
    }
  >
    <S.Nav>
      <Link href="/profile/me" passHref>
        <S.Link>
          <PersonIcon fontSize="small" />
          <span>My profile</span>
        </S.Link>
      </Link>
      <Link href="/wishlist" passHref>
        <S.Link title="Wishlist">
          <StarsIcon />
          <span>Favorite Characters</span>
        </S.Link>
      </Link>

      <Link href="/logout" passHref>
        <S.Link title="Sign out">
          <ExitToAppIcon />
          <span>Sign out</span>
        </S.Link>
      </Link>
    </S.Nav>
  </Dropdown>
)
export default UserDropdown
