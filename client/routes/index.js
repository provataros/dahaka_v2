import React from 'react';
import { Switch,Router, Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import {Templates,Views,App} from "/client/imports/components";

import Template from "/client/imports/components/components/template.jsx";


class RouteWithLayout extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){
        console.log(this.props);
        var that = this;
        var Layout = this.props.layout || Template;
        return (
            <Route {...this.props} render={(props) => 
                (<Layout {...props}><that.props.page {...props}/></Layout>)
            }/>
        )
    }
}

export default class Routes extends React.Component {
    render(){
        return (
                <Switch>
                    <RouteWithLayout exact path="/"  page={Views.Dashboard}/>
                    <RouteWithLayout exact path="/newclient" page={ Views.Client.New } />
                    <RouteWithLayout exact path="/clients/:id" page={ Views.Client.View } />
                    <RouteWithLayout exact path="/configuration" page={ Views.Configuration } />
                    <RouteWithLayout exact path="/configuration/new_lov" page={ Views.NewLov } />
                    <RouteWithLayout exact path="/configuration/lov/:id" page={ Views.ViewLov } />
                    <RouteWithLayout exact path="/configuration/lovs" page={ Views.Lovs } />
                    <RouteWithLayout exact path="/configuration/template" page={ Views.Template } />
                    <RouteWithLayout page={Views.NotFound} />
                </Switch>
        )
    }
}