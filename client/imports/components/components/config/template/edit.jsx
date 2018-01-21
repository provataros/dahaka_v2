import React from 'react';

import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import {LOV} from "/imports/collections";

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
        this.state = {
            sections : [
            ]
        }
    }
    addSection(){
        this.state.sections.push({
            rows : []
        });
        this.setState(this.state);
    }
    addItem(x,xx){
        this.state.sections[x].rows[xx].items.push({});
        this.setState(this.state);
    }
    addRow(i){
        var f = {
            items : []
        }
        this.state.sections[i].rows.push(f);
        this.setState(this.state);
        console.log(this.state);
    }
    componentWillReceiveProps(props){
        this.state.values = props.values;
        this.setState(this.state);
    }
    handleFieldType(x,xx,xxx,v){
        this.state.sections[x].rows[xx].items[xxx].type = v
        this.setState(this.state);
    }
    handleFieldValues(x,xx,xxx,v){
        console.log(x,xx,xxx,v);
        this.state.sections[x].rows[xx].items[xxx].values = v
        this.setState(this.state);
        console.log(this.state);
    }
    getItem(e,x,xx){
        var that = this;
        return e.items.map(function(d,i){
            var key = "."+i;
            var values = null;
            if (d.type == "radio" || d.type == "dropdown"){
                values = (
                    <select value={d.values} onChange={function(e){that.handleFieldValues(x,xx,i,e.target.value)}}>
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
                    <input type="text" style={field_name_style} placeholder="Field Name" defaultValue = {d.name} />
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
                    <input placeholder="Section Title" type="text" style={section_header_style} defaultValue={d.name}/>
                    <br/>
                    <br/>
                    {
                        
                        <div>
                            { 
                                d.rows.map(function(dd,ii){
                                    return (
                                        <div key = {"."+ii}>
                                            {that.getItem(dd,i,ii)}
                                            
                                            <span onClick={function(){that.addItem(i,ii)}}>Add Item...</span>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <h4 onClick = {function(){that.addRow(i)}}>Add Row...</h4>
                    <br/>
                    <br/>
                </div>
            )
        });
        return (
            <div>
                <h1>Client Template</h1>
                <h3 onClick={this.addSection}>Add Section...</h3>
                <br/>
                <br/>
                <br/>
                {sections}
            </div>
        );
    }
}

export default Wrapper = withTracker((props) => {
    
    const handle = Meteor.subscribe('LOVs');
    
    return {
        ready : handle.ready(),
        values : LOV.find({},{fields: {'name':1}}).fetch()
    };
})(Template);
