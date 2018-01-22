import fs from "fs";

var f = false;
console.log(f);
var Tempaltes = {}
var Views = {}
var Components = {}

if (!f){
    import Dashboard from "./components/dashboard.jsx";
    import ClientTabComponent from "./components/client_tab.jsx";
    import GenericNotFound from "./components/404.jsx";
    import ClientSection from "./components/client_section.jsx";
    import ClientField from "./components/client_field.jsx";
    import ConfigurationRoot from "./components/config/root.jsx";
    import NewLov from "./components/config/lov/new.jsx";
    import ViewLov from "./components/config/lov/view.jsx";
    import TogglableButton from "./components/elements/togglable_button.jsx";
    import TogglableButtonList from "./components/elements/togglable_button_list.jsx";
    import RadioButton from "./components/elements/radio_button.jsx";
    import Lovs from "./components/config/lov/list.jsx";
    import Template from "./components/config/template/edit.jsx";
    import NewClient from "./components/config/template/new.jsx";

    

    Templates = {
        Client : {
            Tab : ClientTabComponent,
            Field : ClientField,
            Section : ClientSection
        }
    }
    
    
    Views = {
        Dashboard : Dashboard,
        NotFound : GenericNotFound,
        Configuration : ConfigurationRoot,
        NewLov : NewLov,
        ViewLov : ViewLov,
        Lovs : Lovs,
        Template : Template,
        Client : {
            New : NewClient
        }
    }

    Elements = {
        TogglableButton : TogglableButton,
        TogglableButtonList : TogglableButtonList,
        RadioButton : RadioButton
    }

    f = true;
}
export const Templates = Templates;

export const Views = Views

export const Elements = Elements


