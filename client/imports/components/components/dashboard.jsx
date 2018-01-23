import React from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Link to="/newclient">
          Create Client
        </Link>
        <br />
        <Link to="/configuration">
          Configuration
        </Link>
      </div>
    );
  }
}