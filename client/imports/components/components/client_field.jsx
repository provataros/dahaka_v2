import React from 'react';
import { Mongo } from 'meteor/mongo'
import {Meteor} from "meteor/meteor";

export default class ClientField extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <input type = "text" name={this.props.name} />
      </div>
    );
  }
}