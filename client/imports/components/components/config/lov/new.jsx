import React from 'react';
import {Meteor} from "meteor/meteor";

import {Elements} from "/client/imports/components";

import {Mongo} from "meteor/mongo";

import { Redirect } from 'react-router-dom';


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


export default class NewLov extends React.Component {
    constructor(props){
        super(props);
        this.changed = this.changed.bind(this);
        this.addItem = this.addItem.bind(this);
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
        this.state = {
            items : []
        }
    }
    changed(d){
        this.state.type = d.type
    }
    save(){
        var that = this;
        Meteor.call("saveLov",this.state,function(err,res){
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
        if (this.state.items.length!=0 && !this.state.items[this.state.items.length-1])return;
        var f = null;
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
            return (
                <div key={"."+(i)}>
                    <input placeholder="Enter a value" style={input_style}  type="text" onChange={function(e){that.handleChange(i,e.target.value)}}/>
                </div>
            )
        })
        return (
            <div style={{textAlign : "center"}}>
                {this.state.id?(<Redirect to={"/configuration/lov/"+this.state.id} id={this.state.id}/>):null}
                <div style={parent_style}>
                <input placeholder="List of Values Name" style={input_style}  type="text" onChange={this.changeName}/>
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