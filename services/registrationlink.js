let TestPaperModel = require("../models/testpaper");

let stopRegistration = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        
        var id  =  req.body.id;
        var s = req.body.status;
        TestPaperModel.findById(id,{testbegins:1,testconducted:1}).then((d)=>{
            if(d){
                if(d.testbegins!=true && d.testconducted!=true){
                    TestPaperModel.findOneAndUpdate({_id : id},{isRegistrationavailable : s})      
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
                    res.status(500).json({
                        success : false,
                        message : "Unable to change registration status"
                    })
                }
            }
            else{
                res.status(500).json({
                    success : false,
                    message : "Unable to change registration status"
                })
            }

        }).catch((e)=>{
            console.log(e);
            res.status(500).json({
                success : false,
                message : "Unable to change registration status"
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
module.exports = {stopRegistration}