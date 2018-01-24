import React from 'react';

import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import {LOV,Templates} from "/imports/collections";

import Button from "material-ui/Button";

var section_header_style = {
    border : "none",
    fontSize : "28px",
    outline : "none",
    fontStyle : "italic",
    outline : "none",
    fontFamily : "Arial"
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
    border : "none",
    fontSize : "16px",
    outline : "none",
    width : "125px",
    marginRight : "8px",
    fontFamily : "Arial"
}
var margin_right_style={
    marginRight : "8px"
}
class Template extends React.Component {
    constructor(props){
        super(props);
        this.getItem = this.getItem.bind(this);

        
        this.handleFieldType = this.handleFieldType.bind(this);
        this.handleFieldValues = this.handleFieldValues.bind(this);
        this.saveData = this.saveData.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSectionName = this.handleSectionName.bind(this);


        this.getValues = this.getValues.bind(this);
        this.state = {
            sections : [
            ]
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
    handleFieldType(x,xx,xxx,v){
        console.log(x.nativeEvent.target.value);
    }
    handleSectionName(x){
        console.log(x.nativeEvent.target.value);
    }
    handleNameChange(x,xx,xxx,v){
        console.log(x.nativeEvent.target.value);
    }
    handleFieldValues(x,xx,xxx,v){
        console.log(x.nativeEvent.target.value);
    }
    getValues(v){
        return this.state.values[v];
    }
    saveData(v){
        console.log(this.state);
    }
    getItem(e,x,xx){
        var that = this;
        return e.items.map(function(d,i){
            var key = "."+i;
            var type = d.type;
            var element = null;
            if (type=="text"){
                element = (<input type="text" name={d.name.value}  onChange={that.handleFieldValues}/>)
            }
            else if (type=="checkbox"){
                element = (<input type="checkbox" name={d.name.value} id={d.name.value}  onChange={that.handleFieldValues}/>)
            }
            else if (type=="dropdown" || type == "radio"){
                var vals = that.getValues(d.values);
                if (type=="dropdown"){
                    element = (
                        <select name={d.name.value} onChange={that.handleFieldValues}>
                            {
                                vals.items.map(function(d,i){
                                    return (<option key={"."+i} value={d.value}>{d.content}</option>)
                                })
                            }
                        </select>
                    )
                }
                else if(type=="radio"){
                    element = (
                        <span>
                            {
                                vals.items.map(function(dd,i){
                                return (
                                    <span key={"."+i}>
                                        <label htmlFor={dd.value}>{dd.content}</label>
                                        <input id={dd.value} type="radio" name={d.name.value} key={"."+i} value={dd.value}  onChange={that.handleFieldValues}/>
                                    </span>
                                )
                                
                            })
                        }
                        </span>
                    )
                }
            }
            return (
                <span key={key} style={field_style}>
                    <label style={field_name_style} htmlFor={d.type=="checkbox"?d.name.value:""}>{d.name.content} :</label>
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
    
    return {
        ready : handle1.ready() && handle2.ready(),
        values : LOV.find({}).fetch(),
        template : Templates.findOne({})
    };
})(Template);
