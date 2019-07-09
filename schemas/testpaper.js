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
    subjects : [
    
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubjectModel',
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
        required : false
    },
    testbegins : {
        type : Boolean,
        default : 0,
        required : true
    },
    status : {
        required : true,
        default : 1,
        type : Boolean
    }


},
{ timestamps: {}}

);

module.exports =  testschema;