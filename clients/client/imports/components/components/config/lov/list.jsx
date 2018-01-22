import React from 'react';
import {Meteor} from "meteor/meteor";
import {Elements} from "/client/imports/components";

import { withTracker } from 'meteor/react-meteor-data';
import {Mongo} from "meteor/mongo";

import { Redirect } from 'react-router-dom';

import {LOV} from "/imports/collections";



var item_style = {
    padding : "10px 25px",
    display : "inline-block",
    border : "1px solid black",
    borderRadius : "4px",
    backgroundColor : "lightgray",
    cursor : "pointer",
    marginRight : "15px"
}


class ListLovs extends React.Component {
    constructor(props){
        super(props);
        this.goToDetails = this.goToDetails.bind(this);
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
    goToDetails(id){
        //this.state.target = id;
        //this.setState(this.state);
        this.props.history.push("/configuration/lov/"+id);
    }
    render() {
        var that = this;
        var items = this.state.items.map(function(d,i){
            return (
                <div style={item_style} key={"."+i} onClick={function(){that.goToDetails(d._id)}}>{d.name.content}</div>
            )
        });
        return (
            <div>
                <h1>Lists of Values</h1>
                <div onClick={function(){that.props.history.push("/configuration/new_lov")}}>New...</div>
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



