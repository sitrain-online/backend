let TestPaperModel = require("../models/testpaper");

let stopRegistration = (req,res,next)=>{

    var id  =  req.body.name;
    TestPaperModel.find({_id = id})

    


}