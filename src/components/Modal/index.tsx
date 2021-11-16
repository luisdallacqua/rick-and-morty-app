import { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { makeStyles } from '@mui/styles'

export type ModalProps = {
  textButton: string
  textModalHeader: string
  children: React.ReactNode
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}
const useStyles = makeStyles({
  modal: {
    overflow: 'scroll'
  }
})

const BasicModal: FC<ModalProps> = ({
  textButton,
  textModalHeader,
  children
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen} size="small" variant="contained">
        {textButton}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Personagens favoritos do {textModalHeader}:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default BasicModal
