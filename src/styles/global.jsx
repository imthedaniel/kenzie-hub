import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #121214;
    color: #fff;
  }

  a{
    text-decoration: none;
    color: #FF577F;
  }

  a:hover {
    color: #FF427F
  }

  :root {
  --toastify-color-dark: #343B41;
  --toastify-color-success: #07bc0c;
  --toastify-color-error: #e74c3c;
 
}




`

export default GlobalStyle
