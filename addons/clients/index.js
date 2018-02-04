import fs from "fs";
import React from "react";

var f = false;
console.log(f);
var _Tempaltes = {}
var _Views = {}
var _Components = {}
var _App = null;

import Dashboard from "./imports/components/config/dashboard.jsx";
/*import ClientTabComponent from "./imports/components/client_tab.jsx";
import GenericNotFound from "./imports/components/404.jsx";
import ClientSection from "./imports/components/client_section.jsx";
import ClientField from "./imports/components/client_field.jsx";
import ConfigurationRoot from "./imports/components/config/root.jsx";
import NewLov from "./imports/components/config/lov/new.jsx";
import ViewLov from "./imports/components/config/lov/view.jsx";
import TogglableButton from "./imports/components/elements/togglable_button.jsx";
import TogglableButtonList from "./imports/components/elements/togglable_button_list.jsx";
import RadioButton from "./imports/components/elements/radio_button.jsx";
import Lovs from "./imports/components/config/lov/list.jsx";
import Template from "./imports/components/config/template/edit.jsx";
import NewClient from "./imports/components/config/template/new.jsx";
import ViewClient from "./imports/components/config/template/view.jsx";
*/

_Templates = {
    /*Client : {
        Tab : ClientTabComponent,
        Field : ClientField,
        Section : ClientSection
    }*/
}


_Views = {
    Dashboard : Dashboard,
    /*NotFound : GenericNotFound,
    Configuration : ConfigurationRoot,
    NewLov : NewLov,
    ViewLov : ViewLov,
    Lovs : Lovs,
    Template : Template,
    Client : {
        New : NewClient,
        View : ViewClient,
    }*/
}

_Elements = {
    /*TogglableButton : TogglableButton,
    TogglableButtonList : TogglableButtonList,
    RadioButton : RadioButton*/
}
//App = Root
f = true;


export const Templates = _Templates;

export const Views = _Views

export const Elements = _Elements

export default clients = function(addons){
    console.log(Dashboard);
    addons.routes.push({
        route : "/",
        view : Dashboard,
    });
    console.log(addons);
}

