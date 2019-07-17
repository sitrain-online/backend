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
    },
    questions : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref :  'QuestionModel',
            required : true
        }
    ],
    answers : [
        {
            questionid : {
                type : String,
                required : true
            },
            chosenOption : [
                {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'options',
                    required : false
                }
               
            ]
        }
    ],
    completed :{
        type : Boolean,
        default : false,
        required : true
    }
})

module.exports = answersheetschema;