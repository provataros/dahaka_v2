import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import {App} from "/client/imports/components";
import Addons from "/addons";

console.log(Addons);

Meteor.startup(() => {
  var addons =  Addons.Initialize();
  render( 
    <App addons={addons}/>,
    document.getElementById( 'root' ) 
  );
});
