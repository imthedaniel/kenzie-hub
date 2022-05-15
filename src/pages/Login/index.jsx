//* COMPONENTES
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Copyright from '../../components/Copyright'

//! UTILS
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../../services/api'

const Login = ({ setAuthenticated }) => {
  //#region FORM CONTROL
  const { register, handleSubmit } = useForm()

  const onSubmit = ({ email, password }) => {
    const user = { email, password }

    api
      .post('/sessions', user)
      .then((response) => {
        const { token } = response.data
        const { course_module, name, id } = response.data.user
        setAuthenticated(true)
        localStorage.setItem('@KenzieHub:token', token)
        localStorage.setItem('@KenzieHub:userId', id)
        toast.success('Login successfully done!')
        setTimeout(
          () => history.push(`/dashboard/${name}/${course_module}`),
          1000
        )
      })
      .catch((err) => toast.error(err.response.data.message))
  }

  //#endregion

  //#region REDIRECTS WITH HISTORY
  const history = useHistory()

  const handleHistory = (route) => {
    history.push(route)
  }

  //#endregion

  //#region SHOW AND HIDE PASSWORD INPUT
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  //#endregion

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: '15vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ fontWeight: 'bold', mb: 2 }}
          color='primary'
          component='h1'
          variant='h4'
        >
          Kenzie Hub
        </Typography>
        <Paper sx={{ padding: '0 36px 36px 36px' }}>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Typography
              align='center'
              color='grey.0'
              component='h1'
              variant='h2'
              mb='26px'
            >
              Login
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('email')}
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  className='teste'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password')}
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  id='password'
                  autoComplete='new-password'
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <Visibility fontSize='small' />
                          ) : (
                            <VisibilityOff fontSize='small' />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent='center' sx={{ mt: 3 }}>
              <Grid item>
                <Typography variant='body2'>Don't have an account?</Typography>
              </Grid>
            </Grid>
            <Button
              type='click'
              fullWidth
              variant='contained'
              sx={{
                mt: 2,
                bgcolor: 'grey.1',
                '&:hover': { bgcolor: 'grey.2' },
              }}
              onClick={() => handleHistory('/register')}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

export default Login
