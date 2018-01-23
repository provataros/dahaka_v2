import React from 'react';

import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import {LOV,Templates} from "/imports/collections";
import Button from 'material-ui/Button';


var section_header_style = {
    minWidth : "300px",
    border : "none",
    borderBottom : "1px solid black",
    fontSize : "28px",
    outline : "none",
    fontStyle : "italic",
    width : "100%"
}
var add_button_style = {
    padding : "5px",
    border : "1px solid black",
    cursor : "pointer"
}
var field_style = {
    marginRight : "25px"
}
var field_name_style = {
    minWidth : "75px",
    border : "none",
    borderBottom : "1px solid black",
    fontSize : "16px",
    outline : "none",
    width : "125px",
    marginRight : "8px"
}
var margin_right_style={
    marginRight : "8px"
}
class Template extends React.Component {
    constructor(props){
        super(props);
        this.addSection = this.addSection.bind(this);
        this.addRow = this.addRow.bind(this);
        this.getItem = this.getItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleFieldType = this.handleFieldType.bind(this);
        this.handleFieldValues = this.handleFieldValues.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSectionName = this.handleSectionName.bind(this);
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
        var f = {
            sections : props.state.state,
            values : props.values
        }
        this.setState(f);
        console.log(f);
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
            return (
                <span key={key} style={field_style}>
                    <input type="text" style={field_name_style} placeholder="Field Name" defaultValue = {d.name.content} onChange={function(e){that.handleNameChange(x,xx,i,e.target.value)}}/>
                    <select style={margin_right_style} value={type} onChange={function(e){that.handleFieldType(x,xx,i,e.target.value)}}>
                        <option value="text">Text</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                    </select>
                    {values}
                </span>
            )
        })
    }
    render() {
        var that = this;
        var sections = this.state.sections.map(function(d,i){
            return (
                <div key={"."+i}>
                    <input placeholder="Section Title" type="text" style={section_header_style} defaultValue={d.name.content} onChange = {function(e){that.handleSectionName(i,e.target.value)}}/>
                    <br/>
                    <br/>
                    {
                        
                        <div>
                            { 
                                d.rows.map(function(dd,ii){
                                    return (
                                        <div key = {"."+ii}>
                                            {that.getItem(dd,i,ii)}
                                            
                                            <Button raised color="primary" onClick = {function(){that.addItem(i,ii)}}>Add Item</Button>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <Button raised color="primary" onClick = {function(){that.addRow(i)}}>Add Row</Button>
                    <br/>
                    <br/>
                </div>
            )
        });
        console.log("render?");
        return (
            <div>
                <Button raised color="secondary" onClick = {this.saveTemplate}>
                    Save
                </Button>
                <h1>Client Template</h1>
                <Button raised color="primary" onClick = {this.addSection}>Add Section</Button>
                <br/>
                <br/>
                <br/>
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
        values : LOV.find({},{fields: {'name':1}}).fetch(),
        state : Templates.findOne({})
    };
})(Template);
