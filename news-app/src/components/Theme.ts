import { createTheme, Theme } from '@mui/material/styles';

const theme = (darkMode: boolean): Theme => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    background: {
      default: darkMode ? '#424242' : '#EEEEEE',
    },
  },
});

export default theme;
