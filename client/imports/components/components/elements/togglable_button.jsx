import React from 'react';

var style = {
    display : "inline-block",
    padding : "5px",
    border : "1px solid gray",
    borderRadius : "4px",
    cursor : "pointer",
}

export default class TogglableButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          enabled: props.enabled || false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({
            enabled : !this.state.enabled
        })
    }
    render() {
        var s = Object.assign({},style);
        if (this.state.enabled){
            s["backgroundColor"] = "#92d292";
        }
        else{
            s["backgroundColor"] = "lightgray"; 
        }
        var c = "togglableButton";
        if (this.state.enabled){
            c += " enabled";
        }
        return (
            <div className={c} style={s} onClick={this.toggle}>
                {this.props.content}
            </div>
        );
    }
}