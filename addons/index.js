import clients from "./clients";

function Initialize(){
    var addons = {
        routes : [],
        actions : []
    }
    clients(addons);
    return addons;
}

export default temp = {
    Initialize : Initialize
}