
import {createMuiTheme } from 'material-ui/styles';

const light = createMuiTheme({
  palette: {
    primary: {
      light: '#55d8e8',
      main: '#00bcd4',
      dark: '#1dabbd',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f3739e',
      main: '#ff4081',
      dark: '#f13273',
      contrastText: '#fff',
    },
  },
});

const dark = createMuiTheme({
  palette: {
    primary: {
      light: '#777777',
      main: '#444444',
      dark: '#222222',
      contrastText: '#fff',
    },
    secondary: {
      light: '#847373',
      main: '#674545',
      dark: '#543535',
      contrastText: '#fff',
    },
  },
});

export default theme = dark;
export const Light = light
export const Dark = dark