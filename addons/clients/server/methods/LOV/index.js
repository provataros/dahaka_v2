import { Meteor } from 'meteor/meteor'

import {Mongo} from "meteor/mongo";

import {LOV} from "/imports/collections";

Meteor.publish("LOVs",function(){
    return LOV.find({});
});
Meteor.publish("LOV",function(id){
    return LOV.find({_id : id});
});
Meteor.methods({
    saveLov(state,up) {
        if (up){
            return LOV.upsert({
                _id : state.id
            },{
                name : state.name,
                items : state.items,
                updateDate : Date.now()
            })
        }
        else{
            return LOV.upsert({
                _id : state.id
            },{
                name : state.name,
                items : state.items,
                insertDate : Date.now()
            })
        }

    }
});