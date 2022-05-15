//* COMPONENTES
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material'
import Copyright from '../../components/Copyright'
import { Visibility, VisibilityOff } from '@mui/icons-material'

//! UTILS
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '../../services/api'

const Register = () => {
  //#region FORM CONTROL
  const schemaForm = yup.object().shape({
    name: yup
      .string()
      .required('Required field!')
      .max(18, 'Máx 18 characters')
      .matches(/^[a-zA-Z\s]*$/, 'Name must contain only letters.'),
    email: yup.string().email('Invalid e-mail.').required('Required Field'),
    password: yup
      .string()
      .required('Required field!')
      .min(8, 'Minimum 8 characters!')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        'Password must contain at least one capital letter, one number and one special character!'
      ),
    confirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Password does not match!'),
    course_module: yup.string().required('Required field!'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
  })

  const onSubmit = ({
    email,
    password,
    name,
    bio = 'unused',
    contact = 'unused',
    course_module,
  }) => {
    const user = { email, password, name, bio, contact, course_module }

    api
      .post('/users', user)
      .then((_) => {
        toast.success('Account created successfully!')
        return history.push('/')
      })
      .catch((err) => toast.error(err.response.data.message))
  }

  //#endregion

  //#region REDIRECT WITH HISTORY
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
        <Stack
          direction='row'
          sx={{ justifyContent: 'space-between', width: '100%' }}
        >
          <Typography
            sx={{ fontWeight: 'bold', mb: 2 }}
            color='primary'
            component='h1'
            variant='h5'
          >
            Kenzie Hub
          </Typography>
          <Button
            variant='contained'
            sx={{
              width: '68px',
              height: '27.44px',
              bgcolor: 'grey.3',
            }}
            onClick={() => handleHistory('/')}
          >
            Back
          </Button>
        </Stack>
        <Paper sx={{ padding: '0 36px 36px 36px' }}>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Typography
              align='center'
              color='grey.0'
              component='h2'
              variant='h2'
              mb='12px'
            >
              Register
            </Typography>

            <Typography
              align='center'
              color='grey.0'
              component='p'
              variant='subtitle2'
              mb='26px'
              sx={{ color: 'grey.1' }}
            >
              It's fast and free!
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('name')}
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  name='name'
                  autoComplete='name'
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email')}
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='email'
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('password')}
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  id='password'
                  autoComplete='new-password'
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
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
              <Grid item xs={6}>
                <TextField
                  {...register('confirm')}
                  required
                  fullWidth
                  name='confirm'
                  label='Confirm'
                  id='confirm'
                  autoComplete='confirm-password'
                  error={!!errors?.confirm}
                  helperText={errors?.confirm ? errors.confirm.message : null}
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
              <Grid item xs={12}>
                <TextField
                  {...register('course_module')}
                  required
                  label='Select Module'
                  select
                  fullWidth
                  name='course_module'
                  id='course_module'
                  defaultValue=''
                  error={!!errors?.module}
                  helperText={errors?.module ? errors.module.message : null}
                >
                  <MenuItem value='First Module (Introduction to Front-end)'>
                    First Module
                  </MenuItem>
                  <MenuItem value='Second Module (Advanced Frontend)'>
                    Second Module
                  </MenuItem>
                  <MenuItem value='Third Module (Introduction to Back-end)'>
                    Third Module
                  </MenuItem>
                  <MenuItem value='Fourth Module (Advanced Backend)'>
                    Fourth Module
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                mt: 4,
                bgcolor: 'primary.light',
                '&:hover': { bgcolor: 'primary.main' },
              }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

export default Register
