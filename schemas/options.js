var mongoose = require("../services/connection");

var optionschema = new mongoose.Schema({
    optbody : {
        required : false,
        type : String 
    },
    optimg: {
        type : String,
        required : true,
        default : null
    },
    isAnswer:{
        type : Boolean,
        required : true,
        default : false
    }
})

module.exports = optionschema;