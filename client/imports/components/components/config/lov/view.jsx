import React from 'react';
import {Meteor} from "meteor/meteor";
import qs from "query-string"
import {Elements} from "/client/imports/components";

import { withTracker } from 'meteor/react-meteor-data';
import {Mongo} from "meteor/mongo";

import { Redirect } from 'react-router-dom';

import {LOV} from "/imports/collections";

String.prototype.toCamelCase = function() {
    return this
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}


var button_style = {
    display : "inline-block",
    padding : "5px",
    border : "1px solid gray",
    borderRadius : "4px",
    cursor : "pointer",
}
var radio_style = {
    marginRight : "15px"
}

var input_style = {
    marginTop  : "5px",
    padding : "5px",
    boxSizing : "border-box",
    fontSize : "20px",
    width : "100%"
}
var parent_style = {
    display : "inline-block",
    textAlign : "left",
    minWidth : "500px",
    padding : "25px",
    boxSizing : "border-box"
}
var save_button = {
    padding: "8px",
    border: "1px solid gray",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#73a767",
    textAlign: "center",
    width: "100%",
    color: "white",
    fontSize: "20px",
}


class NewLov extends React.Component {
    constructor(props){
        super(props);
        this.changed = this.changed.bind(this);
        this.addItem = this.addItem.bind(this);
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
        this.state = {
            items : []
        }

        var f = LOV.find({}).count();
        console.log(f);
        console.log(props);
    }
    componentWillReceiveProps(props){
        console.log(props);
        this.state.items = props.result.items;
        this.state.name = props.result.name;
        this.state.id = props.result._id;
        this.setState(this.state);
    }
    changed(d){
        this.state.type = d.type
    }
    save(){
        var that = this;
        console.log(this.state);
        Meteor.call("saveLov",this.state,true,function(err,res){
            if (err)alert("Error");
            else{
                if (res.insertedId){
                    that.state.id = res.insertedId
                }
                that.setState(that.state);
            }
        })
    }
    addItem(){
        console.log(this.state);
        if (this.state.items.length!=0 && !this.state.items[this.state.items.length-1])return;
        var f = {};
        this.state.last = f
        this.state.items.push(f);
        this.setState(this.state);
    }
    handleChange(i,v){
        this.state.items[i] = {
            content : v,
            value : v.toCamelCase()
        }
        this.setState(this.state);
    }
    changeName(e){
        this.state.name = {
            content : e.target.value,
            value : e.target.value.toCamelCase()
        }
        this.setState(this.state);
    }
    render() {
        var that = this;
        var items = this.state.items.map(function(d,i){
            console.log(d,i);
            return (
                <div key={"."+(i)}>
                    <input value = {d.content?d.content:""} placeholder="Enter a value" style={input_style}  type="text" onChange={function(e){that.handleChange(i,e.target.value)}}/>
                </div>
            )
        })
        return (
            <div style={{textAlign : "center"}}>
                <div style={parent_style}>
                <input placeholder="List of Values Name" style={input_style}  type="text" onChange={this.changeName} value={this.state.name?this.state.name.content:""}/>
                    <h3>Values</h3>
                    <div style={button_style} onClick = {this.addItem}>Add</div>
                    <br/>
                    {items}
                    <br/>
                    <br/>
                    <div style={save_button} onClick={this.save}>
                        Save
                    </div>
                </div>
            </div>
        );
    }
}


export default ListPageContainer = withTracker((props) => {
    console.log(props.match.params.id);
    
    const handle = Meteor.subscribe('LOV',props.match.params.id);
    
    return {
        ready : handle.ready(),
        result : LOV.findOne({})
    };
})(NewLov);



