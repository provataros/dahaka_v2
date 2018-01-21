import React from 'react';
import {Elements} from "/client/imports/components";

var style = {
    margin : "0px 10px"
}

export default class TogglableButtonList extends React.Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        var that = this;
        this.state = {
            enabled : null
        }
    }
    toggle(d){
        if (this.state.enabled == d)return;
        this.setState({
            enabled : d
        })
        if (this.props.onchange){
            this.props.onchange(d);
        }
    }
    render() {
        var that = this;
        return (
            React.Children.map(this.props.children, (child) => {
                var e = false;
                if (this.state.enabled == child)e=true;
                return React.cloneElement(child, {
                    enabled : e,
                    action: function(){
                        that.toggle(child);
                    },});
            })
        );
    }
}