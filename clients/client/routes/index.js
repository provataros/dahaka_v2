import React from 'react';
import { Switch,Router, Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import {Templates,Views,App} from "/client/imports/components";

export default class Routes extends React.Component {
    render(){
        return (
                <Switch>
                    <Route exact path="/"  component={Views.Dashboard}/>
                    <Route exact path="/newclient" component={ Views.Client.New } />
                    <Route exact path="/configuration" component={ Views.Configuration } />
                    <Route exact path="/configuration/new_lov" component={ Views.NewLov } />
                    <Route exact path="/configuration/lov/:id" component={ Views.ViewLov } />
                    <Route exact path="/configuration/lovs" component={ Views.Lovs } />
                    <Route exact path="/configuration/template" component={ Views.Template } />
                    <Route component={Views.NotFound} />
                </Switch>
        )
    }
}