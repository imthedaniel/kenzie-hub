//* COMPONENTES
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { Add, Close } from '@mui/icons-material'
import { Modal as ModalCreate } from '@mui/material'
import { toast } from 'react-toastify'
import TechCard from '../../components/TechCard'

//! UTILS
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

// CREATE MODAL STYLE
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

const Dashboard = ({ authenticated, setAuthenticated }) => {
  //#region USER INFO
  const { name, module } = useParams()
  const [userId] = useState(localStorage.getItem('@KenzieHub:userId')) || ''
  const [token] = useState(localStorage.getItem('@KenzieHub:token') || '')

  //#endregion

  //#region TECH CONTROL
  const [techList, setTechList] = useState([])

  const loadTechList = () => {
    api
      .get(`/users/${userId}`)
      .then((response) => setTechList(response.data.techs))
      .catch((err) => toast.error(err.response.data.message))
  }

  useEffect(() => {
    loadTechList()
  }, [])

  useEffect(() => {}, [techList])

  //#endregion

  //#region MODAL CREATE CONTROL
  const [openCreate, setOpenCreate] = useState(false)
  const handleOpenCreate = () => setOpenCreate(true)
  const handleCloseCreate = () => setOpenCreate(false)

  //#endregion

  //#region REDIRECT WITH HISTORY
  const history = useHistory()
  const handleHistory = (route) => {
    history.push(route)
  }

  //#endregion

  //#region LOGOUT
  const logout = () => {
    setAuthenticated(false)
    localStorage.clear()
    handleHistory('/')
  }

  //#endregion

  //#region FORM CONTROL (ADD NEW TECH)
  const { register, handleSubmit, reset } = useForm()

  const addTech = (tech) => {
    api
      .post('/users/techs', tech, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => {
        toast.success(`${tech.title} added successfully!`)
        loadTechList()
        reset()
      })
      .catch((err) => toast.error(err.response.data.message))
  }

  //#endregion

  //#region SECURITY
  if (token === '') {
    return <Redirect to='/' />
  }

  //#endregion

  return (
    <>
      <ModalCreate
        open={openCreate}
        onClose={handleCloseCreate}
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
              Add a new technology
            </Typography>
            <IconButton onClick={handleCloseCreate}>
              <Close />
            </IconButton>
          </Stack>

          <Box onSubmit={handleSubmit(addTech)} sx={{ p: 2 }} component='form'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('title')}
                  required
                  fullWidth
                  id='tech-title'
                  label='Technology Name'
                  name='title'
                  autoComplete='tech-title'
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
                  defaultValue=''
                >
                  <MenuItem value='Beginner'>Beginner</MenuItem>
                  <MenuItem value='Intermediary'>Intermediary</MenuItem>
                  <MenuItem value='Advanced'>Advanced</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Button
              type='submit'
              fullWidth
              size='large'
              variant='contained'
              sx={{
                mt: 2,
                bgcolor: 'primary',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              Add new technology
            </Button>
          </Box>
        </Box>
      </ModalCreate>

      <AppBar position='static' elevation={0}>
        <Toolbar
          disableGutters
          sx={{
            bgcolor: 'grey.4',
          }}
        >
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'grey.4',
              p: '15px',
            }}
            maxWidth='md'
            component='header'
            disableGutters
          >
            <Typography
              sx={{ fontSize: '20px' }}
              color='primary'
              variant='h1'
              component='div'
            >
              Kenzie Hub
            </Typography>
            <Button
              onClick={logout}
              sx={{ bgcolor: 'grey.3' }}
              variant='contained'
            >
              Logout
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Divider />
      <Container maxWidth='md' component='header' disableGutters>
        <Stack
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '120px',
            padding: '15px',
            textAlign: 'center',
          }}
          direction='row'
        >
          <Typography sx={{ color: 'grey.0' }} variant='h1'>
            {`Hello, ${name}`}
          </Typography>
          <Typography sx={{ color: 'grey.1' }} variant='body1'>
            {module}
          </Typography>
        </Stack>
      </Container>

      <Divider />
      <Container
        sx={{
          padding: '15px',
        }}
        maxWidth='md'
        component='header'
        disableGutters
      >
        <Stack
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
          direction='row'
        >
          <Typography variant='h2'>Technologies</Typography>
          <IconButton
            sx={{
              padding: '0px',
            }}
            onClick={handleOpenCreate}
          >
            <Add sx={{ bgcolor: 'grey.3', p: '2px', fontSize: '24px' }} />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            justifyContent: 'center',
            textAlign: 'center',
            bgcolor: 'grey.3',
            padding: '22px 19px',
          }}
          spacing={2}
        >
          {techList.length > 0 ? (
            techList
              .map((tech) => (
                <TechCard
                  key={tech.id}
                  tech={tech}
                  loadTechList={loadTechList}
                />
              ))
              .reverse()
          ) : (
            <Stack spacing={1}>
              <Skeleton variant='rectangular' height={50} />
              <Skeleton variant='rectangular' height={50} />
              <Skeleton variant='rectangular' height={50} />
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  )
}

export default Dashboard
