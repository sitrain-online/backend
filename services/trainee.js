var TraineeEnterModel = require("../models/trainee");
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
                message : ` Entered successfully!`
            })
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({
                success : false,
                message : "Unable to enter!"
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