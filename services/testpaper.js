let QuestionModel = require("../models/questions");
let TestPaperModel = require("../models/testpaper");
let tool = require("./tool");

let createEditTest = (req,res,next)=>{
    var _id = req.body._id || null;
    if(req.user.type==='TRAINER'){
    req.check('type', `invalid type`).notEmpty();
    req.check('title', 'enter title').notEmpty();
    req.check('questions', 'enter questions').notEmpty();

    var errors = req.validationErrors()
    if(errors){
        res.json({
            success : false,
            message : 'Invalid inputs',
            errors : errors
        })
    }
    else {
        var title =  req.body.title;
        var questions = req.body.questions;
        if(_id!=null){
            TestPaperModel.findOneAndUpdate({
                _id : _id,

            },
            {
                title : title,
                questions : questions
            }).then(()=>{
                res.json({
                    success: true,
                    message :  "Testpaper has been updated!"
                })
            }).catch((err)=>{
                res.status(500).json({
                    success : false,
                    message : "Unable to update testpaper!"
            })
        })
      }
    else{
        var type =  req.body.type;
        var title =  req.body.title;
        var questionsid =  req.body.questions;
        var difficulty =  req.body.difficulty;
        var organisation = req.body.organisation;
        var duration = req.body.duration;
            TestPaperModel.findOne({ title : title,type : type,testbegins : 0 },{status:0})
            .then((info)=>{
                if(!info){
                    var tempdata = TestPaperModel({
                        type: type,
                        title : title,
                        questions : questionsid,
                        difficulty : difficulty,
                        organisation : organisation,
                        duration :duration,
                        createdBy : req.user._id
                    })
                    tempdata.save().then(()=>{
                        res.json({
                            success : true,
                            message : `New testpaper created successfully!`
                        })
                    }).catch((err)=>{
                        console.log(err);
                        res.status(500).json({
                            success : false,
                            message : "Unable to create new testpaper!"
                        })
                    })
                }
                else{
                    res.json({
                        success : false,
                        message : `This testpaper already exists!`
                    })
                }   

            })
        
        }
     }
  }
    else{
        res.status(401).json({
            success : false,
            message : "Permissions not granted!"
        })

    }
}



module.exports = {createEditTest}