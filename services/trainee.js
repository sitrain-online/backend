var TraineeEnterModel = require("../models/trainee");
var TestPaperModel = require("../models/testpaper");
var FeedbackModel = require("../models/feedback");
var sendmail = require("../services/mail").sendmail

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

        TestPaperModel.findOne({ _id : testid, isRegistrationavailable : true }).then((info)=>{
            if(info){
                TraineeEnterModel.findOne({$or:[{emailid : emailid , testid : testid},{contact : contact, testid : testid}]}).then((data)=>{
                    if(data){
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
                        tempdata.save().then((u)=>{
                                sendmail(emailid,"Registered Successfully",`You have been successfully registered for the test. Click on the link given to take test  "${req.protocol + '://' + req.get('host')}/trainee/taketest?testid=${testid}&traineeid=${u._id}"`).then((dd)=>{
                                    console.log(dd)
                                }).catch((errr)=>{
                                    console.log(errr);
                                })
                            res.json({
                                success : true,
                                message : `Trainee registered successfully!`,
                                user : u
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
            console.log(err)
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
    
    let resendmail = (req,res,next)=>{
        var userid = req.body.id;
        TraineeEnterModel.findById(userid,{emailid:1,testid : 1}).then((info)=>{
            if(info){
                console.log(info)
                sendmail(info.emailid,"Registered Successfully",`You have been successfully registered for the test. Click on the link given to take test  "${req.protocol + '://' + req.get('host')}/trainee/taketest?testid=${info.testid}&traineeid=${info._id}"`).then((dd)=>{
                    console.log(dd)
                }).catch((errr)=>{
                    console.log(errr);
                })
                res.json({
                    success : true,
                    message : `Link sent successfully!`,

                })

            }
            else{
                res.json({
                    success : false,
                    message : "This user has not been registered."

                })
            }


        })

    }

module.exports = {traineeenter,feedback,resendmail}