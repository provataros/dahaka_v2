import React from 'react';

import {MuiThemeProvider } from 'material-ui/styles';
import { browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Drawer from "material-ui/Drawer"

import Routes from "/client/routes";
import Reboot from 'material-ui/Reboot';


import Template from "./template.jsx";

import theme from "/client/imports/themes/default"


export default class App extends React.Component{
    render(){
        return (
            <MuiThemeProvider theme={theme}>
                <Reboot />
                <BrowserRouter history={ browserHistory }>
                    <Routes routes={this.props.addons.routes}/>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}