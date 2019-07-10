let QuestionModel = require("../models/questions");
let TestPaperModel = require("../models/testpaper");
let tool = require("./tool");
let options = require("../models/option");
let SubjectModel = require("../models/subject");
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
        var difficulty =  req.body.difficulty || null;
        var organisation = req.body.organisation;
        var duration = req.body.duration;
        var subjects = req.body.subjects;
        
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
                        createdBy : req.user._id,
                        subjects : subjects,
                    
                    })
                    tempdata.save().then((d)=>{
                        res.json({
                            success : true,
                            message : `New testpaper created successfully!`,
                            testid : d._id
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

let getSingletest = (req,res,next)=>{
    let id = req.params._id;
    console.log(id);
    TestPaperModel.find({_id: id,status : 1},{createdAt: 0, updatedAt : 0,status : 0})
    .populate('createdBy', 'name')
    .populate('questions' , 'body')
    .populate({
        path: 'subjects',
        model : SubjectModel
    })
    .populate({ path: 'questions', 
        populate: {  
            path: 'options',
            model: options,
        }
    })
    .exec(function (err, testpaper) {
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
                data : testpaper
            })   
        }
    })        
}

let getAlltests = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        var title = req.body.title;
            TestPaperModel.find({status : 1},{status : 0})
            .populate('createdBy', 'name')
            .populate('questions' , 'body')
            .populate({
                path: 'subjects',
                model : SubjectModel
            })
            .populate({ path: 'questions', 
            populate: {  
                path: 'options',
                model: options
            }

        })
        
            .exec(function (err, testpaper) {
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
                        data : testpaper
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

let deleteTest = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        var _id =  req.body._id;
        TestPaperModel.findOneAndUpdate({
            _id : _id
        },
        {
            status : 0

        }).then(()=>{
            res.json({
                success: true,
                message :  "Test has been deleted"
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Unable to delete test"
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



 

module.exports = {createEditTest,getSingletest,getAlltests,deleteTest}