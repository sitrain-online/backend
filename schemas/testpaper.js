var mongoose = require("../services/connection");

var testschema = new mongoose.Schema({

    type : {
        type: String,
        required : true
    },

    title : {
        type : String,
        required : true

    },

    questions : [
    
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'QuestionModel',
                required : false
            }
        
    ],

    duration : {
        type : String,
        required : true
    
        },
    organisation : {
        type : String,
        required : false
    }


},
{ timestamps: {}}

);

module.exports =  testschema;