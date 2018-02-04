import React from 'react';
import {Meteor} from "meteor/meteor";
import {Elements} from "/client/imports/components";

import { withTracker } from 'meteor/react-meteor-data';
import {Mongo} from "meteor/mongo";

import { Redirect } from 'react-router-dom';

import {LOV} from "/imports/collections";

import Button from "material-ui/Button";
import { Link } from 'react-router-dom';


import AddIcon from "material-ui-icons/Add";


import theme from "/client/imports/themes/default"


var item_style = {
    padding : "10px 25px",
    display : "inline-block",
    border : "1px solid black",
    borderRadius : "4px",
    backgroundColor : "lightgray",
    cursor : "pointer",
    margin : "0px 15px 15px 0px"
}


class ListLovs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items : []
        }
    }
    componentWillReceiveProps(props){
        console.log(props.result);
        this.setState({
            items : props.result
        })
    }
    render() {
        var that = this;
        var items = this.state.items.map(function(d,i){
            return (
                <Button key={"."+i} style={{textTransform : "none",margin : "0px 15px 15px 0px"}} raised color="primary" component={Link} to = {"/configuration/lov/"+d._id}>
                    {d.name?d.name.content:""}
                </Button>
            )
        });
        return (
            <div>
                <h1>Lists of Values</h1>
                <Button fab style={{textTransform : "none",position : "absolute", bottom : theme.spacing.unit * 2,right : theme.spacing.unit * 2}} raised color="secondary" component={Link} to = "/configuration/new_lov">
                    <AddIcon/>
                </Button>
                <br/>
                <br/>
                {items}
            </div>
        )
    }
}


export default ListPageContainer = withTracker((props) => {
    console.log();
    
    const handle = Meteor.subscribe('LOVs',props.match.params.id);
    
    return {
        ready : handle.ready(),
        result : LOV.find({},{sort: {insertDate: -1}}).fetch()
    };
})(ListLovs);



