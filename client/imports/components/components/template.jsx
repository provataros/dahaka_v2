import React from 'react';

import {MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Drawer from "material-ui/Drawer"
import List, {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import IconButton  from "material-ui/IconButton"
import AppBar  from "material-ui/AppBar"
import MenuIcon from "material-ui-icons/Menu"

import Toolbar from "material-ui/Toolbar"

import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import BackSpace from 'material-ui-icons/KeyboardBackspace';
import SettingsIcon from 'material-ui-icons/Settings';
import HomeIcon from 'material-ui-icons/Home';
import Divider from 'material-ui/Divider';

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import Collapse from 'material-ui/transitions/Collapse';

import { Link } from 'react-router-dom';

class SidePanel extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.state.open = !this.state.open;
        this.setState(this.state);
    }
    render(){
        return (
            <Drawer anchor="left" open={this.props.open} onClose={this.props.onClose}>
                <IconButton onClick={this.props.onClose}>
                    <MenuIcon/>
                </IconButton>
                <List>
                    <ListItem button component={Link} to="/" onClick={this.props.onClose}> 
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse component="div" in={this.state.open} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <ListItem button component={Link} to="/configuration/lovs" onClick={this.props.onClose}>
                                <ListItemText inset primary="Values" />
                            </ListItem>
                            <ListItem button component={Link} to="/configuration/template" onClick={this.props.onClose}>
                                <ListItemText inset primary="Template" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        )
    }
}

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            panel : false
        };
        this.toggleSidePanel = this.toggleSidePanel.bind(this);
        this.close = this.close.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    goBack(){
        this.props.history.goBack();
    }
    toggleSidePanel(){
        this.state.panel = true;
        this.setState(this.state);
    }
    close(){
        this.state.panel = false;
        this.setState(this.state);
    }
    render(){
        return (
            <React.Fragment>
                <AppBar position="static" style={{flexFlow : "row"}}>
                        <IconButton style={{color : "white"}} component="span" color="default" onClick={this.toggleSidePanel}>
                            <MenuIcon/>
                        </IconButton>
                        <IconButton style={{color : "white"}} component="span" color="default" onClick={this.goBack}>
                            <BackSpace/>
                        </IconButton>
                </AppBar>
                <SidePanel open={this.state.panel} onClose={this.close}>
                    {this.props.children}
                </SidePanel>
                <div style={{padding : "25px"}}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}