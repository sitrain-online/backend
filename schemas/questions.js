var mongoose = require("../services/connection");
var UserModel = require("../models/user");


var questionschema = new mongoose.Schema({

     body : {
        required : true ,
        type : String
    },
    options :[
        {
            optbody : {
                type : String,
                required : false
            },
            optimg: {
                type : String,
                required : false
            },
            isAnswer:{
                type : Boolean

            }

        }
    ],
   
    quesimg: { 
        required : false,
        data: Buffer,
        contentType: String
         
    },
    subject : {
        required : true ,
        type : String,
    
    },
    difficulty:{
        required : true,
        default : 0,
        type : String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
},

    { timestamps: {}}

    );

    module.exports = questionschema;



