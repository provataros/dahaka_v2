import React from 'react';

var style = {
    display : "inline-block",
    padding : "5px",
    border : "1px solid gray",
    borderRadius : "4px",
    cursor : "pointer",
    userSelect : "none"
}

export default class TogglableButton extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(props){
    }
    render() {
        var s = Object.assign({},style,this.props.style);
        if (this.props.enabled){
            s["backgroundColor"] = "#92d292";
        }
        else{
            s["backgroundColor"] = "lightgray"; 
        }
        var c = "togglableButton";
        if (this.props.enabled){
            c += " enabled";
        }
        return (
            <div className={c} style={s} onClick={this.props.action?this.props.action:null}>
                {this.props.content}
            </div>
        );
    }
}