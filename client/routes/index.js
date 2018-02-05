import React from 'react';
import { Switch,Router, Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import {Template} from "/client/imports/components";


class RouteWithLayout extends React.Component {
    constructor(props){
        super(props);
    }
    render(){

        var that = this;
        var Layout = this.props.layout || Template;
        return (
            <Route {...this.props} render={(props) => 
            (<Layout {...props} menu = {that.props.menu}>{that.props.page?(<that.props.page {...props}/>):null}</Layout>)
            }/>
        )
    }
}

function addToMenu(menu,m){
    var segments = m.path.split("/");

    var current = menu;
    segments.map(function(d,i){
        if (!current[d]){
            if (i==segments.length-1){
                current[d] = {
                    name : d,
                    url : m.url,
                    icon : m.icon
                }
            }
            else{
                    current[d] = {
                    name : d,
                    icon : m.icon
                }
            }
        }
        current = current[d];
    })
}

export default class Routes extends React.Component {
    render(){
        /*var x = (
            <React.Fragment>
                <RouteWithLayout exact path="/"  page={Views.Dashboard}/>
                <RouteWithLayout exact path="/newclient" page={ Views.Client.New } />
                <RouteWithLayout exact path="/clients/:id" page={ Views.Client.View } />
                <RouteWithLayout exact path="/configuration" page={ Views.Configuration } />
                <RouteWithLayout exact path="/configuration/new_lov" page={ Views.NewLov } />
                <RouteWithLayout exact path="/configuration/lov/:id" page={ Views.ViewLov } />
                <RouteWithLayout exact path="/configuration/lovs" page={ Views.Lovs } />
                <RouteWithLayout exact path="/configuration/template" page={ Views.Template } />
                <RouteWithLayout page={Views.NotFound} />
            </React.Fragment>
        );*/
        var menus = {}
        var routes = this.props.routes.map(function(d,i){
            if (d.menu){
                addToMenu(menus,d.menu);
            }
            return (<RouteWithLayout key={i} exact path={d.path} page={d.view} actions={d.actions} menu={menus}/>)
        })
        return (
            <Switch>
                {routes}
            </Switch>
        )
    }
}