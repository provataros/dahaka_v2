import React from "react";


Meteor.startup(() => {
    if (Meteor.isServer){
        import srv from "./server/methods"
    }
    else if (Meteor.isClient){
        import Reports from "./client/components/reports.jsx";
        
        export default clients = function(addons){
            addons.routes.push({
                route : "/reports",
                view : Reports,
                menu : {
                    path : "Reports",
                    url : "/reports",
                    icon : "Description"
                }
            });
        }
    }
});