var mongoose = require("../services/connection");
var feedbackschema = new mongoose.Schema({
    feedback : {
        type : String,
        required : false
    },
    rating : {
        type : Number,
        required : false
    }
})
module.exports = feedbackschema;