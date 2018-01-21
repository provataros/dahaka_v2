import React from 'react';

import ClientField from "./client_field.jsx";


export default class ClientSection extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <ClientField title="Name" name="fname" />
        <ClientField title="Job"  name="job"/>
      </div>
    );
  }
}