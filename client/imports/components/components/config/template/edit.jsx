import React from 'react';

import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import {LOV,Templates} from "/imports/collections";
import Button from 'material-ui/Button';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';

import AddIcon from "material-ui-icons/Add";

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
    marginRight : "25px",
    display : "inline-block",
    marginBottom : "10px",
    padding : "15px",
    verticalAlign : "middle"
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
        this.resetTemplate = this.resetTemplate.bind(this);
        this.state = {
            sections : [
            ],
            registry : {

            }
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
        this.setState(this.state);
    }
    addItem(x,xx){
        this.state.sections[x].rows[xx].items.push({
            type : "text",
            name : {
                content : "",
                value : ""
            }
        });
        this.setState(this.state);
    }
    addRow(i){
        var f = {
            items : []
        }
        this.state.sections[i].rows.push(f);
        this.setState(this.state);
    }
    saveTemplate(){
        Meteor.call("saveTemplate",this.state.sections,function(err,res){
            console.log(err,res);
        });
    }
    componentWillReceiveProps(props){
        if (!props.ready){return;}
        var s = props.initialState?props.initialState.state:[]
        var f = {
            sections : JSON.parse(JSON.stringify(s)),
            values : JSON.parse(JSON.stringify(props.values))
        }
        this.setState(f);
    }
    handleFieldType(x,xx,xxx,v){
        this.state.sections[x].rows[xx].items[xxx].type = v
        if (v=="text" || v=="checkbox"){
            delete this.state.sections[x].rows[xx].items[xxx].values; 
        }
        this.setState(this.state);
    }
    handleSectionName(i,v){
        this.state.sections[i].name = {
            content : v,
            value : v.toCamelCase()
        }
        this.setState(this.state);
    }
    resetTemplate(){
        this.state.sections =  JSON.parse(JSON.stringify(this.props.initialState.state));
        this.setState(this.state)
    }
    handleNameChange(x,xx,xxx,v){
        var f = {
            value : v.toCamelCase(),
            content : v
        }
        var that = this;
        Object.keys(this.state.registry).map(function(d){
            var key = x+"."+xx+"."+xxx;
            if (d==key)return true;
            if (that.state.registry[d] == f.value){
                f.unique=false;
            }
        })
        this.state.sections[x].rows[xx].items[xxx].name = f
        this.state.registry[x+"."+xx+"."+xxx] = f.value;
        this.setState(this.state);
    }
    handleFieldValues(x,xx,xxx,v){
        this.state.sections[x].rows[xx].items[xxx].values = v
        this.setState(this.state);
    }
    getItem(e,x,xx){
        var that = this;
        return e.items.map(function(d,i){
            var key = "."+i;
            var values = null;
            if (d.type == "radio" || d.type == "dropdown"){
                values = (
                    <Select required style={{verticalAlign:"bottom"}} value={d.values?d.values:""} displayEmpty={true} onChange={function(e){that.handleFieldValues(x,xx,i,e.target.value)}}>
                        <MenuItem value={""}>Values?</MenuItem>
                        {
                            that.props.values.map(function(d,i){
                                return (<MenuItem key={"."+i} value={d._id}>{d.name.content}</MenuItem>)
                            })
                        }
                    </Select>
                )
            }
            var type = d.type;
            return (
                <Paper elevation={3} key={key} style={field_style}>
                    <TextField InputProps={{style : {color : d.name.unique==false?"red":"inherit"}}} required placeholder="Field Name" value = {d.name.content} onChange={function(e){that.handleNameChange(x,xx,i,e.target.value)}}/>
                    <Select value={type} onChange={function(e){that.handleFieldType(x,xx,i,e.target.value)}}>
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="dropdown">Dropdown</MenuItem>
                        <MenuItem value="radio">Radio</MenuItem>
                        <MenuItem value="checkbox">Checkbox</MenuItem>
                    </Select>
                    {values}
                </Paper>
            )
        })
    }
    
    render() {
        var that = this;
        var sections = this.state.sections.map(function(d,i){
            return (
                <Paper key={"."+i} elevation={4} style={{padding : "25px",marginBottom : "25px"}}>
                    <TextField fullWidth placeholder="Section Title" type="text" value={d.name.content} onChange = {function(e){that.handleSectionName(i,e.target.value)}}/>
                    <br/>
                    <br/>
                    {
                        
                        <div>
                            { 
                                d.rows.map(function(dd,ii){
                                    return (
                                        <div key = {"."+ii} style={{marginBottom : "25px"}}>
                                            {that.getItem(dd,i,ii)}
                                            <Button fab mini raised color="primary" onClick = {function(){that.addItem(i,ii)}}   style={{marginBottom : "15px",verticalAlign : "middle"}}>
                                                <AddIcon/>
                                            </Button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <Button raised color="primary" onClick = {function(){that.addRow(i)}}>Add Row</Button>
                    <br/>
                    <br/>
                </Paper>
            )
        });
        return (
            <React.Fragment>
                <Button raised color="secondary" onClick = {this.saveTemplate}>
                    Save
                </Button>
                <h1>Client Template</h1>
                &nbsp;
                <Button raised color="primary" onClick = {this.resetTemplate}>Reset</Button>
                <br/>
                <br/>
                <br/>
                {sections}
                <Button raised color="primary" onClick = {this.addSection}>Add Section</Button>
                <br/>
                <br/>
                <br/>
            </React.Fragment>
        );
    }
}

export default Wrapper = withTracker((props) => {
    
    const handle1 = Meteor.subscribe('LOVs');
    const handle2 = Meteor.subscribe('Templates');
    
    return {
        ready : handle1.ready() && handle2.ready(),
        values : LOV.find({},{fields: {'name':1}}).fetch(),
        initialState : Templates.findOne({})
    };
})(Template);
