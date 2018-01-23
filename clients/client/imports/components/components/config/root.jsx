import React from 'react';

import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

export default class Configuration extends React.Component {
  render() {
    return (
      <div>
        <h1>Configuration</h1>
        
        <Button style={{textTransform : "none"}} raised color="primary" component={Link} to = "/configuration/lovs">
          Lists of Values
        </Button>
        <br />
        <br />
        <Button style={{textTransform : "none"}} raised color="primary" component={Link} to = "/configuration/template">
            Client Template
        </Button>
      </div>
    );
  }
}