var TraineeEnterModel = require("../models/trainee");
var TestPaperModel = require("../models/testpaper");
var FeedbackModel = require("../models/feedback");

let traineeenter = (req,res,next)=>{
    req.check('emailid', ` Invalid email address`).isEmail().notEmpty();
    req.check('contact','Invalid contact').isLength({min : 13,max :13}).isNumeric({no_symbols: false});
    var errors = req.validationErrors()
    if(errors){
        res.json({
            success : false,
            message : 'Invalid inputs',
            errors : errors
        })
    }
    else {
        var name =  req.body.name;
        var emailid =  req.body.emailid;
        var contact =  req.body.contact;
        var organisation =  req.body.organisation;
        var testid = req.body.testid;
        var location = req.body.location;

        TestPaperModel.findOne({ testid : testid, isRegistrationavailable : true }).then((info)=>{
            if(info.length!=0){
                TraineeEnterModel.find({$or:[{emailid : emailid , testid : testid},{contact : contact, testid : testid}]}).then((data)=>{
                    if(data.length!=0){
                        res.json({
                            success : false,
                            message : "This id has already been registered for this test!"
                        })
                    }
                    else{
                        var tempdata = TraineeEnterModel({
                            name: name,
                            emailid : emailid,
                            contact : contact,
                            organisation : organisation,
                            testid : testid,
                            location : location
                        })
                        tempdata.save().then(()=>{
                            res.json({
                                success : true,
                                message : `Trainee registered successfully!`
                            })
                        }).catch((err)=>{
                            console.log(err);
                            res.status(500).json({
                                success : false,
                                message : "Server error!"
                            })
                        })
                    }
                })
                
            }
            else{
                res.json({
                    success : false,
                    message : ` Registration for this test has been closed!`
                })
            }
            
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : `Server error!`
            })
        })
    }
}

let feedback = (req,res,next)=>{
        var feedback =  req.body.feedback;
        var rating =  req.body.rating;
       
        var tempdata = FeedbackModel({
            feedback : feedback,
            rating : rating
        })
        tempdata.save().then(()=>{
            res.json({
                success : true,
                message : `Feedback recorded successfully!`
            })
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({
                success : false,
                message : "Error occured!"
            })
        })
    }
    

module.exports = {traineeenter,feedback}