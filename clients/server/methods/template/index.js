import { Meteor } from 'meteor/meteor'

import {Mongo} from "meteor/mongo";

import {Templates} from "/imports/collections";

Meteor.publish("Templates",function(){
    return Templates.find({name : "root"});
});

Meteor.methods({
    saveTemplate(state) {  
        var f = {};
        var errors = []
        state.map(function(d){
            if (!d.name.value || !d.name.content){

                errors.push("Section name is empty");
            }
            if (d.rows.length == 0){

                errors.push("Section is empty");
            }
            d.rows.map(function(d){
                if (d.items.length == 0){
    
                    errors.push("Row is empty");
                }
                d.items.map(function(d){
                    if (!d.name.value || !d.name.content){
        
                        errors.push("Item name is empty");
                    }
                    if (!d.type){
        
                        errors.push("Item has no type");
                    }
                    if (d.type == "dropdown" || d.type == "radio"){
                        if (!d.values){
            
                            errors.push("List item has no values selected");
                        }
                    }
                })
            })
        })
        
        if (errors.length==0){
            var f = Templates.upsert({name : "root"},{name : "root",state : state});
            if (f.numberAffected == 1){
                return "OK"
            }
            else{
                throw new Meteor.Error("Template saving failed");
            }
        }
        else{
            throw new Meteor.Error("Template validation failed",errors);
        }
    }
});