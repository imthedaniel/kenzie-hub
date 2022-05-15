import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Copyright = (props) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' to='/'>
        KenzieHub
      </Link>{' '}
      {new Date().getFullYear()}
      {' - '}
      {'Developed by '}
      <Link to={{ pathname: 'https://github.com/imthedaniel' }} target='_blank'>
        imthedaniel
      </Link>
      {'.'}
    </Typography>
  )
}

export default Copyright
