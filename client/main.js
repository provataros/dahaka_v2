import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import {App} from "/client/imports/components";
import Addons from "/imports/addons";

Meteor.startup(() => {
  console.log(Addons);
  var addons =  Addons.Initialize();
  render( 
    <App addons={addons}/>,
    document.getElementById( 'root' ) 
  );
});
