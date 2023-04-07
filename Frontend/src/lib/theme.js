import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
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
    typography: {
      "fontFamily":'Ubuntu',
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
     }
});


export default theme