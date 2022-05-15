import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Modal as ModalEdit } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../../services/api'

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  bgcolor: 'background.paper',
  borderRadius: '4px 4px 0px 0px',
  border: '2px solid #000',
  boxShadow: 24,
}

const TechCard = ({ tech, loadTechList }) => {
  const [token] = useState(localStorage.getItem('@KenzieHub:token')) || ''

  //MODAL EDIT CONTROL
  const { register, handleSubmit } = useForm()

  const [openEdit, setOpenEdit] = useState(false)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)

  const handleTech = (newLevel, event) => {
    const buttonValue = event.nativeEvent.submitter.value

    if (buttonValue === 'Update') {
      api
        .put(`/users/techs/${tech.id}`, newLevel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((_) => {
          toast.success(`${tech.title} updated!`)
          loadTechList()
          handleCloseEdit()
        })
        .catch((err) => toast.error(err.response.data.message))
    } else if (buttonValue === 'Delete') {
      api
        .delete(`/users/techs/${tech.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((_) => {
          toast.success(`${tech.title} successfully deleted!`)
          loadTechList()
          handleCloseEdit()
        })
        .catch((err) => toast.error(err.response.data.message))
    }
  }

  return (
    <>
      <ModalEdit
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Stack
            sx={{
              justifyContent: 'space-between',
              bgcolor: '#343B41',
              borderRadius: '4px 4px 0px 0px',
              alignItems: 'center',
            }}
            direction='row'
          >
            <Typography
              sx={{ fontWeight: '700', ml: 1.2 }}
              id='modal-modal-title'
              variant='h3'
              component='h1'
            >
              Technology Details
            </Typography>
            <IconButton onClick={handleCloseEdit}>
              <Close />
            </IconButton>
          </Stack>

          <Box
            onSubmit={handleSubmit(handleTech)}
            sx={{ p: 2 }}
            component='form'
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  fullWidth
                  id='tech-title'
                  label='Technology Name'
                  name='title'
                  autoComplete='tech-title'
                  value={tech.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('status')}
                  required
                  label='Technology Level'
                  select
                  fullWidth
                  name='status'
                  id='tech-level'
                  defaultValue={tech.status ? tech.status : ''}
                >
                  <MenuItem value='Beginner'>Beginner</MenuItem>
                  <MenuItem value='Intermediary'>Intermediary</MenuItem>
                  <MenuItem value='Advanced'>Advanced</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  type='submit'
                  fullWidth
                  size='large'
                  value='Update'
                  variant='contained'
                  sx={{
                    mt: 2,
                    bgcolor: 'primary.light',
                    '&:hover': { bgcolor: 'primary.main' },
                  }}
                >
                  Update level
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type='submit'
                  fullWidth
                  size='large'
                  value='Delete'
                  variant='contained'
                  sx={{
                    mt: 2,
                    bgcolor: 'grey.2',
                    '&:hover': { bgcolor: 'grey.1' },
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ModalEdit>

      <Card
        onClick={handleOpenEdit}
        sx={{
          bgcolor: 'grey.4',
          border: 'none',
          '&:hover': { bgcolor: 'grey.2', cursor: 'pointer' },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: '16px',

            '&:last-child': { pb: '16px' },
          }}
        >
          <Typography variant='h2'>{tech.title}</Typography>
          <Typography variant='body2' color='text.secondary'>
            {tech.status}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default TechCard
