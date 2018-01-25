import { Meteor } from 'meteor/meteor'

import {Mongo} from "meteor/mongo";

import {Clients} from "/imports/collections";

Meteor.publish("Clients",function(id){
    if (!id)return Clients.find({});
    return Clients.find({_id : id});
});

Meteor.methods({
    createClient(state) {
        var _id = state._id;
        delete state._id;
        return Clients.upsert({
            _id : state.id
        },state)
    }
});