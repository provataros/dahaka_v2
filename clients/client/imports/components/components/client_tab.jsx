import React from 'react';

import { Link } from 'react-router-dom';
import ClientSection from "./client_section.jsx";


export default class ClientTabComponent extends React.Component {
  render() {
    return (
        <ClientSection title="Personal Data"/>
    );
  }
}