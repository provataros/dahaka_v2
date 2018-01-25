import React from 'react';

import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import {LOV,Templates,Clients} from "/imports/collections";

import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import Radio from "material-ui/Radio";
import Select from "material-ui/Select";
import {MenuItem} from "material-ui/Menu";


import { Redirect } from 'react-router-dom';


var section_header_style = {
    border : "none",
    fontSize : "28px",
    outline : "none",
    fontStyle : "italic",
    outline : "none",
}
var add_button_style = {
    padding : "5px",
    border : "1px solid black",
    cursor : "pointer"
}
var field_style = {
    marginRight : "25px",
    display : "inline-block",
    marginBottom : "15px"
}
var field_name_style = {
    minWidth : "75px",
    marginRight : "8px",
}
var margin_right_style={
    marginRight : "8px"
}
class Template extends React.Component {
    constructor(props){
        super(props);
        this.getItem = this.getItem.bind(this);

        this.handleFieldValues = this.handleFieldValues.bind(this);
        this.saveData = this.saveData.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSectionName = this.handleSectionName.bind(this);


        this.getValues = this.getValues.bind(this);
        this.state = {
            sections : [],
            data : {

            }
        }
    }
    componentWillReceiveProps(props){
        if (!props.ready){return;}
        var x = {};
        props.values.map(function(d){
            x[d._id] = d;
        });
        var f = {
            sections : props.template.state,
            values : x
        }
        this.setState(f);
    }
    handleFieldValues(id,value){
        value = ((value==null||value==undefined||value=="")?null:value)
        this.state.data[id] = value;
        this.setState(this.state)
    }
    handleSectionName(x){
        console.log(x.nativeEvent.target.value);
    }
    handleNameChange(x,xx,xxx,v){
        console.log(x.nativeEvent.target.value);
    }
    getValues(v){
        return this.state.values[v];
    }
    saveData(v){
        var that = this;
        Meteor.call("createClient",this.state.data,function(err,res){
            if (err)alert("Error");
            else{
                if (res.insertedId){
                    that.state.id = res.insertedId
                }
                that.setState(that.state);
            }
        })
    }
    getItem(e,x,xx){
        var that = this;
        return e.items.map(function(d,i){
            var key = "."+i;
            var type = d.type;
            var element = null;
            if (type=="text"){

                element = (
                    <React.Fragment>
                        <label style={field_name_style}>{d.name.content} :</label>
                        <TextField name={d.name.value} defaultValue={that.state.data[d.name.value]} onChange={function(e){that.handleFieldValues(d.name.value,e.target.value)}}/>
                    </React.Fragment>
                )
            }
            else if (type=="checkbox"){
                
                element = (
                    <React.Fragment>
                        <label style={{cursor : "pointer",verticalAlign:"middle"}} onClick={function(e){that.handleFieldValues(d.name.value,!that.state.data[d.name.value])}}>{d.name.content} :</label>
                        <Checkbox checked={that.state.data[d.name.value]==true} name={d.name.value} id={d.name.value}  onChange={function(e){that.handleFieldValues(d.name.value,e.target.checked)}}/>
                    </React.Fragment>
                )
            }
            else if (type=="dropdown" || type == "radio"){
                var vals = that.getValues(d.values);
                if (type=="dropdown"){
                    element = (
                        <React.Fragment>
                            <label style={{verticalAlign : "middle"}}>{d.name.content} :  </label>
                            <Select style={{verticalAlign : "middle"}} autoWidth={false} displayEmpty={true}  name={d.name.value} value={that.state.data[d.name.value]?that.state.data[d.name.value]:""} onChange={function(e){that.handleFieldValues(d.name.value,e.target.value)}}>
                                {
                                    vals.items.map(function(d,i){
                                        return (<MenuItem key={"."+i} value={d.value}>{d.content}</MenuItem>)
                                    })
                                }
                            </Select>
                        </React.Fragment>
                    )
                }
                else if(type=="radio"){
                    element = (                            
                        <React.Fragment>
                            <label style={field_name_style}>{d.name.content} :</label>
                            {
                                vals.items.map(function(dd,i){
                                return (
                                    <span key={"."+i}>
                                        <label style={{cursor : "pointer"}} onClick={function(e){that.handleFieldValues(d.name.value,dd.value)}}>{dd.content}</label>
                                        <Radio id={dd.value} type="radio" name={d.name.value} key={"."+i} value={dd.value} checked={that.state.data[d.name.value]==dd.value} onChange={function(e){that.handleFieldValues(d.name.value,dd.value)}}/>
                                    </span>
                                )
                                
                            })
                        }
                        </React.Fragment>
                    )
                }
            }
            return (
                <span key={key} style={field_style}>
                    
                    {element}                    
                </span>
            )
        })
    }
    render() {
        var that = this;
        var sections = this.state.sections.map(function(d,i){
            return (
                <div key={"."+i}>
                    <div style={section_header_style}>{d.name.content}</div>
                    <br/>
                    {
                        <div>
                            { 
                                d.rows.map(function(dd,ii){
                                    return (
                                        <div key = {"."+ii} style={{marginBottom : "10px"}}>
                                            {that.getItem(dd,i,ii)}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <br/>
                    <br/>
                </div>
            )
        });
        return (
            <React.Fragment>
                {this.state.id?(<Redirect to={"/clients/"+this.state.id} id={this.state.id}/>):null}
                <Button raised color="secondary" onClick={this.saveData}>   
                    Save
                </Button>
                <br/>
                <br/>         
                {sections}
            </React.Fragment>
        );
    }
}

export default Wrapper = withTracker((props) => {
    
    const handle1 = Meteor.subscribe('LOVs');
    const handle2 = Meteor.subscribe('Templates');
    console.log(props);
    const handle3 = {
        ready(){
            return true;
        }
    }
    if (props.match.params.id)handle3 = Meteor.subscribe('Clients',props.match.params.id);
    
    return {
        ready : handle1.ready() && handle3.ready() && handle2.ready(),
        values : LOV.find({}).fetch(),
        template : Templates.findOne({}),
        client : Clients.findOne({_id : props.match.params.id})
    };
})(Template);
