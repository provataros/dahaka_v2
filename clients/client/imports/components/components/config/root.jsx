import React from 'react';

import { Link } from 'react-router-dom';

export default class Configuration extends React.Component {
  render() {
    return (
      <div>
        <h1>Configuration</h1>
        <Link to = "/configuration/lovs">
          Lists of Values
        </Link>
        <br />
        <br />
        <Link to = "/configuration/template">
          Client Template
        </Link>
      </div>
    );
  }
}