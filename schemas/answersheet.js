var mongoose = require("../services/connection");
var answersheetschema = new mongoose.Schema({
    startTime : {
        type : Number,
        required : true
    },
    testid :{ 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'TestPaperModel',
        required : true
    },
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'TraineeEnterModel',
        required : true
    }
})

module.exports = answersheetschema;