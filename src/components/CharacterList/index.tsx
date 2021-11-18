import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

import { CharacterMock as mock } from '../../mocks/character'

const CharacterList = () => {
  return (
    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <ListItem
        alignItems="flex-start"
        sx={{ backgroundColor: '#cacaca', marginBottom: '.3rem' }}
      >
        <ListItemAvatar>
          <Avatar
            alt={`image of ${mock[0].name}`}
            src={mock[0].image}
            sx={{ width: 60, height: 60, marginRight: '.5rem' }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${mock[0].name} - ${mock[0].species}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="common.black"
              >
                <FiberManualRecordIcon
                  sx={{
                    fontSize: 10,
                    color:
                      mock[0].status === 'Alive'
                        ? 'secondary.main'
                        : 'error.main'
                  }}
                />
                {mock[0].status}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem
        alignItems="flex-start"
        sx={{ backgroundColor: '#cacaca', marginBottom: '.3rem' }}
      >
        <ListItemAvatar sx={{ height: '100%' }}>
          <Avatar
            alt={`image of ${mock[1].name}`}
            src={mock[1].image}
            sx={{ width: 56, height: 56, marginRight: '.5rem' }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${mock[1].name} - ${mock[1].species}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="common.black"
              >
                <FiberManualRecordIcon
                  sx={{
                    fontSize: 10,
                    color:
                      mock[1].status === 'Alive'
                        ? 'secondary.main'
                        : 'error.main'
                  }}
                />
                {mock[1].status}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  )
}

export default CharacterList
