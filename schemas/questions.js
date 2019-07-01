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
    explanation : {
        type : String,
        required : true


    },
    
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubjectModel',
        required : true
    },
   
    quesimg: { 
        required : false,
        data: Buffer,
        contentType: String
         
    },
    difficulty:{
        required : true,
        default : 0,
        type : String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    status:{
        type: Boolean,
        default : 1,
        required : true
    }
},

    { timestamps: {}}

    );

    module.exports = questionschema;



