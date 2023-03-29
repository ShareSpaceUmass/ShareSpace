import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        paper: '#18131a',
        default: '#120214',
      },
      text: {
        primary: '#2d103b',
        link: '#DFB2E4'
      },
      primary: {
        main: '#120214',
      },
      secondary: {
        main:'#B77BF3'
      }
    },
});


export default theme