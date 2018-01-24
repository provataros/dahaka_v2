import React from 'react';
import { Link } from 'react-router-dom';

import Button from "material-ui/Button"

export default class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Button raised color="primary" component={Link} to="/newclient">
          Create Client
        </Button>
        <br />
        <br />
        <Button raised color="primary" component={Link} to="/configuration">
        Configuration
        </Button>
      </React.Fragment>
    );
  }
}