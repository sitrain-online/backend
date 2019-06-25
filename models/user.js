var mongoose = require("../services/connection");
var userschema = require("../schemas/user");


var UserModel = mongoose.model(`user`,userschema);
module.exports=UserModel;