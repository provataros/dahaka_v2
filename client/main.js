import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import {App} from "/client/imports/components";

console.log(App);

Meteor.startup(() => {
  render( 
    <App />,
    document.getElementById( 'root' ) 
  );
});
