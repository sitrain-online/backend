var mongoose = require("../services/connection");
var UserModel = require("../models/user");

var subjectschema = new mongoose.Schema({
    topic : {
        required : true,
        type : String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    } 
},
{ timestamps: {}}

);


module.exports = subjectschema;
