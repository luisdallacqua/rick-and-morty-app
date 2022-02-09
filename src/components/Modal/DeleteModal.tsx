import React from 'react'
import BasicModal from '.'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'

interface DeleteModalProps {
  id: string
}

const DeleteModal = ({ id }: DeleteModalProps) => {
  function handleDelete(id: string) {
    console.log('clicou', id)
  }

  return (
    <BasicModal
      variant="outlined"
      color="error"
      textButton={<DeleteIcon sx={{ color: 'red' }} />}
      textModalHeader="CONFIRMATION"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          mt: 4
        }}
      >
        <Typography variant="h6">
          If you delete this user you will not be able to recovery any
          information about it, are you sure?
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="error"
            sx={{ mr: 2 }}
            onClick={() => handleDelete(id)}
          >
            Ok
          </Button>
          <Button variant="contained" color="primary">
            Cancel
          </Button>
        </Box>
      </Box>
    </BasicModal>
  )
}

export default DeleteModal
