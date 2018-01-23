import React from 'react';

import {MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Drawer from "material-ui/Drawer"

import Routes from "/client/routes";
import Reboot from 'material-ui/Reboot';
import Template from "./template.jsx";

const theme = createMuiTheme({
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

console.log(theme);

export default class App extends React.Component{
    render(){
        return (
            <MuiThemeProvider theme={theme}>
                <Reboot />
                <BrowserRouter history={ browserHistory }>
                    <Template>
                        <Routes/>
                    </Template>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}