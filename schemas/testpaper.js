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
        type : Number,
        required : true
    
        },
    organisation : {
        type : String,
        required : false
    },
    difficulty : {
        type : Number,
        default : 1,
        required : true
    },
    testbegins : {
        type : Boolean,
        default : 0,
        required : true
    }


},
{ timestamps: {}}

);

module.exports =  testschema;