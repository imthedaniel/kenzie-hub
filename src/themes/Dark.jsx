import { createTheme } from '@mui/material/styles'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF577F',
      light: '#59323f',
      dark: '#ff427f',
    },
    grey: {
      4: '#121214',
      3: '#212529',
      2: '#343B41',
      1: '#868E96',
      0: '#F8F9FA',
    },
    background: {
      default: '#121214',
      paper: '#212529',
    },
    success: {
      main: '#3FE864',
    },
    error: {
      main: '#E83F5B',
    },
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 12,
    h1: {
      fontSize: 18,
      fontWeight: 700,
    },
    h2: {
      fontSize: 16,
      fontWeight: 600,
    },
    h3: {
      fontSize: 14,
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 300,
    margin: 100,
  },
  resize: {
    fontSize: 50,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #212529 inset',
            '-webkit-text-fill-color': '#757575',
          },
        },
      },
    },
  },
})
