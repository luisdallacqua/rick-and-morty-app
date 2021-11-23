import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      black: '#121416',
      white: '#fafafa'
    },
    secondary: {
      main: '#1db954', // omitting light and dark will calculate from main
      contrastText: '#fafafa'
    },
    grey: {
      '500': '#bcbcbc',
      '700': '#79797a'
    },
    info: {
      main: '#1bb2f1'
    },
    success: {
      main: '#00d589'
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    fontFamily: 'Roboto'
  }
})

export default theme
