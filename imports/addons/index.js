import reports from "./reports";

var temp = true;

if (Meteor.isClient){
    console.log("Client");
    
    function Initialize(){
        var addons = {
            routes : [],
            menu : []
        }
        reports(addons);
        return addons;
    }
    temp = {
        Initialize : Initialize
    }

}

if (Meteor.isServer){
}


    
export default mod = temp;