import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material'
import { UserProps } from '../../context/types'

const AccountProfile = (user: UserProps) => {
  if (Object.keys(user).length === 0) return <div>Loading...</div>

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.picture}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  )
}

export default AccountProfile
