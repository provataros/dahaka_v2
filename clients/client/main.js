import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Switch,Router, Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';



import {Templates,Views} from "/client/imports/components";


Meteor.startup(() => {
  render( 
    <BrowserRouter history={ browserHistory }>
      <Switch>
        <Route exact path="/" component={ Views.Dashboard }/>
        <Route exact path="/newclient" component={ Views.Client.New } />
        <Route exact path="/configuration" component={ Views.Configuration } />
        <Route exact path="/configuration/new_lov" component={ Views.NewLov } />
        <Route exact path="/configuration/lov/:id" component={ Views.ViewLov } />
        <Route exact path="/configuration/lovs" component={ Views.Lovs } />
        <Route exact path="/configuration/template" component={ Views.Template } />
        <Route component={Views.NotFound} />
      </Switch>
    </BrowserRouter>, 
    document.getElementById( 'root' ) 
  );
});
