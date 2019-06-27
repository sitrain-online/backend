let QuestionModel = require("../models/questions");
let tool = require("./tool");


let createEditquestion = (req,res,next)=>{
    var _id = req.body._id || null;
    if(req.user.type==='TRAINER'){
    req.check('body', `invalid question`).notEmpty();
    var errors = req.validationErrors()
    if(errors){
        res.json({
            success : false,
            message : 'Invalid inputs',
            errors : errors
        })
    }
    else {
        var body =  req.body.body;
        var options =  req.body.options;
        var quesimg =  req.body.quesimg;
        var difficulty =  req.body.difficulty;
        var subjectid = req.body.subjectid;
            QuestionModel.findOne({ body : body }).then((info)=>{
                if(!info){
                    var tempdata = QuestionModel({
                        body: body,
                        options : options,
                        quesimg : quesimg,
                        subject : subjectid,
                        difficulty :difficulty,
                        createdBy : req.user._id
                    })
                    tempdata.save().then(()=>{
                        res.json({
                            success : true,
                            message : `New question created successfully!`
                        })
                    }).catch((err)=>{
                        console.log(err);
                        res.status(500).json({
                            success : false,
                            message : "Unable to create new question!"
                        })
                    })
                }
                else{
                    res.json({
                        success : false,
                        message : `This question already exists!`
                    })
                }   

            })
        
    }
    
}
  


    else{
        res.status(401).json({
            success : false,
            message : "Permissions not granted!"
        })

    }
}


let deleteQuestion = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        var _id =  req.body._id;
        QuestionModel.findOneAndRemove({
            _id : _id
        }).then(()=>{
            res.json({
                success: true,
                message :  "Question has been deleted"
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Unable to delete question"
            })
        })
    }
    else{
        res.status(401).json({
            success : false,
            message : "Permissions not granted!"
        })
    } 
}


let getAllQuestions = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        var subject = req.body.subject;
        if(subject.length!==0){
            QuestionModel.find({subject : subject})
            .populate('createdBy', 'name')
            .populate('subjectid', 'topic')
            .exec(function (err, question) {
                if (err){
                    console.log(err)
                    res.status(500).json({
                        success : false,
                        message : "Unable to fetch data"
                    })
                }
                else{
                    res.json({
                        success : true,
                        message : `Success`,
                        data : question
                    })
                }
            })        

        }
        else{
            QuestionModel.find({})
            .populate('createdBy', 'name')
            .populate('subjectid', 'topic')
            .exec(function (err, question) {
                if (err){
                    console.log(err)
                    res.status(500).json({
                        success : false,
                        message : "Unable to fetch data"
                    })
                }
                else{
                    res.json({
                        success : true,
                        message : `Success`,
                        data : question
                    })
                }
            })        
        }
        }
    else{
        res.status(401).json({
            success : false,
            message : "Permissions not granted!"
        })
    } 
}   
 




let getSingleQuestion = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        let _id = req.params._id;
        console.log(_id);
        QuestionModel.findById(_id)
        .populate('createdBy', 'name')
        .exec(function (err, question) {
            if (err){
                console.log(err)
                res.status(500).json({
                    success : false,
                    message : "Unable to fetch data"
                })
            }
            else{
                res.json({
                    success : true,
                    message : `Success`,
                    data : question
                })
            }
        })        
    }
    else{
        res.status(401).json({
            success : false,
            message : "Permissions not granted!"
        })
    }    
}

module.exports = { createEditquestion, getAllQuestions, getSingleQuestion, deleteQuestion }







