import React from 'react';


import {Elements} from "/client/imports/components";


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
        this.state = {
            items : []
        }
    }
    changed(d){
        this.state.type = d.type
    }
    save(){
        console.log(this.state.items);
        console.log(this.state.enabled);
    }
    addItem(){
        if (this.state.items.length!=0 && !this.state.items[this.state.items.length-1].value)return;
        var f = {};
        this.state.last = f
        this.state.items.push(f);
        this.setState(this.state);
    }
    handleChange(i,v){
        this.state.items[i].value = v;
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
                <div style={parent_style}>
                    <h3>Type : &nbsp;&nbsp;&nbsp;</h3>
                    <Elements.TogglableButtonList onchange={this.changed}>
                        <Elements.RadioButton type="list" style={radio_style} content="List"/>
                        <Elements.RadioButton type="dropdown" style={radio_style} content="Dropdown"/>
                        <Elements.RadioButton type="radio" style={radio_style} content="Radio"/>
                    </Elements.TogglableButtonList>
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