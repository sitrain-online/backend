let QuestionModel = require("../models/questions");

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
        var correctopt =  req.body.correctopt;
        var quesimg =  req.body.quesimg;
        var subject =  req.body.subject;
        var difficulty =  req.body.difficulty;

        if(_id!=null){
            QuestionModel.findOneAndUpdate({
                _id : _id
            },
            {
                body : body,
                options : options,
                correctopt : correctopt,
                quesimg : quesimg,
                subject : subject,
                difficulty : difficulty
                
            }).then(()=>{
                res.json({
                    success: true,
                    message :  "Question has been updated"
                })
            }).catch((err)=>{
                res.status(500).json({
                    success : false,
                    message : "Unable to change question details"
            })
        })

    }
        else{   
            QuestionModel.findOne({ body : body }).then((info)=>{
                if(!info){
                    var tempdata = QuestionModel({
                        body: body,
                        options : options,
                        quesimg : quesimg,
                        subject : subject,
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
        QuestionModel.find({subject: 'subject'})
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

module.exports = { createEditquestion, getAllQuestions, getSingleQuestion }







