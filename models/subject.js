var mongoose = require("../services/connection");
var subjectschema = require("../schemas/subjects");


var SubjectModel = mongoose.model(`subject`,subjectschema);
module.exports=SubjectModel;