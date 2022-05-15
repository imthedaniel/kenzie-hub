//! UTILS
import { ToastContainer } from 'react-toastify'
import { ThemeProvider, CssBaseline } from '@mui/material'
import Routes from './routes'

//? CSS AND IMGS
import GlobalStyle from './styles/global'
import { DarkTheme } from './themes'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'dark'}
      />
      <CssBaseline />
      <GlobalStyle />
      <ThemeProvider theme={DarkTheme}>
        <Routes />
      </ThemeProvider>
    </>
  )
}

export default App
