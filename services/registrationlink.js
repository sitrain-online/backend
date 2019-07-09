let TestPaperModel = require("../models/testpaper");

let stopRegistration = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        var id  =  req.body.id;
        var s = req.body.status;
        TestPaperModel.findOneAndUpdate({_id : id},{isRegitrationavailable : s})      
        .exec(function (err){
            if (err){
                console.log(err)
                res.status(500).json({
                    success : false,
                    message : "Unable to change registration status"
                })
            }
            else{
                res.json({
                    success : true,
                    message : `Registration status changed!`,
                    currentStatus : s
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
module.exports = {stopRegistration}