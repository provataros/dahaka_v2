import React from 'react';

import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import {LOV,Templates} from "/imports/collections";

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
        this.saveTemplate = this.saveTemplate.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSectionName = this.handleSectionName.bind(this);


        this.getValues = this.getValues.bind(this);
        this.state = {
            sections : [
            ]
        }
    }
    addSection(){
        this.state.sections.push({
            rows : [],
            name : {
                content : "",
                value : "",
            }
        });
        this.setState(this.state.sections);
    }
    addItem(x,xx){
        this.state.sections[x].rows[xx].items.push({
            type : "text",
            name : {
                content : "",
                value : ""
            }
        });
        this.setState(this.state.sections);
    }
    addRow(i){
        var f = {
            items : []
        }
        this.state.sections[i].rows.push(f);
        this.setState(this.state.sections);
    }
    saveTemplate(){
        console.log(this.state.sections);
        Meteor.call("saveTemplate",this.state.sections,function(err,res){
            console.log(err,res);
        });
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
        this.state.sections[x].rows[xx].items[xxx].type = v
        if (v=="text" || v=="checkbox"){
            delete this.state.sections[x].rows[xx].items[xxx].values; 
        }
        this.setState(this.state.sections);
    }
    handleSectionName(i,v){
        this.state.sections[i].name = {
            content : v,
            value : v.toCamelCase()
        }
        this.setState(this.state.sections);
    }
    handleNameChange(x,xx,xxx,v){
        var f = {
            value : v.toCamelCase(),
            content : v
        }
        this.state.sections[x].rows[xx].items[xxx].name = f

        this.setState(this.state.sections);
    }
    handleFieldValues(x,xx,xxx,v){
        this.state.sections[x].rows[xx].items[xxx].values = v
        this.setState(this.state.sections);
    }
    getValues(v){
        return this.state.values[v];
    }
    getItem(e,x,xx){
        var that = this;
        return e.items.map(function(d,i){
            var key = "."+i;
            var values = null;
            if (d.type == "radio" || d.type == "dropdown"){
                values = (
                    <select value={d.values} onChange={function(e){that.handleFieldValues(x,xx,i,e.target.value)}}>
                        <option value=""/>
                        {
                            that.props.values.map(function(d,i){
                                return (<option key={"."+i} value={d._id}>{d.name.content}</option>)
                            })
                        }
                    </select>
                )
            }
            var type = d.type;
            var element = null;
            if (type=="text"){
                element = (<input type="text" name={d.name.value}/>)
            }
            else if (type=="checkbox"){
                element = (<input type="checkbox" name={d.name.value} id={d.name.value}/>)
            }
            else if (type=="dropdown" || type == "radio"){
                var vals = that.getValues(d.values);
                if (type=="dropdown"){
                    element = (
                        <select name={d.name.value}>
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
                                        <input id={dd.value} type="radio" name={d.name.value} key={"."+i} value={dd.value}/>
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
            <div>
                {sections}
            </div>
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
