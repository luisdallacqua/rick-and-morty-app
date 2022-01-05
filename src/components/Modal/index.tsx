import { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { makeStyles } from '@mui/styles'

export type ModalProps = {
  textButton: React.ReactNode
  textModalHeader?: string
  children: React.ReactNode
  isDeleteOption?: boolean
  disabled?: boolean
}

const useStyles = makeStyles({
  modal: {
    overflowY: 'scroll'
  }
})

const BasicModal: FC<ModalProps> = ({
  textButton,
  textModalHeader,
  children,
  isDeleteOption = false,
  disabled = false
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button disabled={disabled} onClick={handleOpen}>
        {textButton}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '50%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
          className={classes.modal}
        >
          {isDeleteOption ? (
            ''
          ) : (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Favorite characters of {textModalHeader}:
            </Typography>
          )}

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default BasicModal
