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


import * as Icons from "material-ui-icons";



class SidePanel extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
        }
        this.handleClick = this.handleClick.bind(this);
        this.getMenu = this.getMenu.bind(this);
    }
    handleClick(){
        this.state.open = !this.state.open;
        this.setState(this.state);
    }
    getMenu(menu){
        var that = this;
        if (menu.url){
            return (
                <ListItem key={menu.name} button component={Link} to={menu.url} onClick={that.props.onClose}> 
                    <ListItemText inset primary={menu.name} />
                </ListItem>
            )
        }
        return Object.keys(menu).map(function(d,i){
            d = menu[d];
            var Icon = d.icon?Icons[d.icon]:null;
            return d.url?(
                <ListItem key={i} button component={Link} to={d.url} onClick={that.props.onClose}> 
                    {d.icon?(<ListItemIcon>
                        <Icon />
                    </ListItemIcon>):null
                    }
                    <ListItemText primary={d.name} />
                </ListItem>
            ):(
                <React.Fragment  key={i} >
                    <ListItem button onClick={that.handleClick}> 
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={d.name} />
                        {that.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse key={i} in={that.state.open} component="div" timeout="auto" unmountOnExit>
                        <List disablePadding>
                            {
                                Object.keys(d).map(function(dd){
                                    if (dd=="name")return false;
                                    var x = that.getMenu(d[dd]);
                                    return x;
                                })
                            }
                        </List>
                    </Collapse>
                </React.Fragment>
            )
        })
    }
    render(){
        var that = this;
        
        var menu = this.getMenu(this.props.menu);

        return (
            <Drawer anchor="left" open={this.props.open} onClose={this.props.onClose}>
                <IconButton onClick={this.props.onClose}>
                    <MenuIcon/>
                </IconButton>
                <List>
                    {menu}
                </List>
            </Drawer>
        )
    }
}

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            panel : false,
            actions : []
        };
        this.toggleSidePanel = this.toggleSidePanel.bind(this);
        this.close = this.close.bind(this);
        this.goBack = this.goBack.bind(this);
        this.addActions = this.addActions.bind(this);
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
    addActions(actions){
        this.setState({actions : actions})
    }
    render(){
        var actions = this.props.actions?this.props.actions.map(function(d,i){
            return null;//React.cloneElement(d,{key : i})
        }):[];
        return (
            <React.Fragment>
                <AppBar position="static" style={{flexFlow : "row",justifyContent : "space-between"}}>
                    <div style = {{flexFlow : "row"}}>
                        <IconButton style={{color : "white"}} component="span" color="default" onClick={this.toggleSidePanel}>
                            <MenuIcon/>
                        </IconButton>
                        <IconButton style={{color : "white"}} component="span" color="default" onClick={this.goBack}>
                            <BackSpace/>
                        </IconButton>
                    </div>
                    <div style = {{flexFlow : "row"}}>
                        {this.state.actions}
                    </div>
                </AppBar>
                <SidePanel open={this.state.panel} onClose={this.close} menu={this.props.menu}/>
                <div style={{padding : "25px"}}>
                    {React.cloneElement(this.props.children,{addActions : this.addActions})}
                </div>
            </React.Fragment>
        )
    }
}

/*

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

                    */