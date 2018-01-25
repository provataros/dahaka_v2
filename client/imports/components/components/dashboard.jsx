import React from 'react';
import { Link } from 'react-router-dom';

import Button from "material-ui/Button"
import List from "material-ui/List"
import {ListItemText,ListItem} from "material-ui/List"
import Avatar from "material-ui/Avatar"

import {Clients} from "/imports/collections"; 

import { withTracker } from 'meteor/react-meteor-data';

import AvatarIcon from "material-ui-icons/AccountCircle"

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data : []
    }
  }
  componentWillReceiveProps(props){
    this.state.data = props.clients;
    this.setState(this.state);
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
}

export default Wrapper = withTracker((props) => {
    
  const handle1 = Meteor.subscribe('Clients');
  console.log(props);
  return {
      ready : handle1.ready(),
      clients : Clients.find({}).fetch(),
  };
})(Dashboard);
