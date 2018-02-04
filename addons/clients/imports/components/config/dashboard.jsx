import React from 'react';
import { Link } from 'react-router-dom';

import Button from "material-ui/Button"
import List from "material-ui/List"
import {ListItemText,ListItem} from "material-ui/List"
import Avatar from "material-ui/Avatar"

import {Clients} from "/imports/collections"; 

import { withTracker } from 'meteor/react-meteor-data';

import AvatarIcon from "material-ui-icons/AccountCircle"
import IconButton  from "material-ui/IconButton"
import SettingsIcon from 'material-ui-icons/Settings';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data : []
    }
    this.internal = this.internal.bind(this);


    this.props.addActions([
      <React.Fragment key={1} >
        <IconButton style={{color : "white"}} component="span" color="default" onClick={this.internal}>
            <SettingsIcon/>
        </IconButton>
        <IconButton style={{color : "white"}} component="span" color="default" onClick={this.internal}>
            <SettingsIcon/>
        </IconButton>
      </React.Fragment>
    ]);
  }
  componentWillReceiveProps(props){
    this.state.data = props.clients;
    this.setState(this.state);
  }
  internal(){
    Meteor.call("oracle");
  }
  render() {
    return (
      <React.Fragment>
        <Button raised color="primary" component={Link} to="/newclient">
          Create Client
        </Button>
        <List>
          {this.state.data.map(d => (
            <ListItem key={d._id} dense button component={Link} to={"/clients/"+d._id}>
                <Avatar>
                  <AvatarIcon/>
                </Avatar>
              <ListItemText primary={d._id} />
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    );
  }
  actions = "Asdsad"
}

export default Wrapper = withTracker((props) => {
    
  const handle1 = Meteor.subscribe('Clients');
  console.log(props);
  return {
      ready : handle1.ready(),
      clients : Clients.find({}).fetch(),
  };
})(Dashboard);
