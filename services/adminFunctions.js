let UserModel = require("../models/user");
let tool = require("./tool");

let trainerRegister = (req,res,next)=>{
    console.log(req.user.type);
    var _id = req.body._id || null;
    if(req.user.type==='ADMIN'){
        req.check('name', `invalid name`).notEmpty();
        if(_id==null){
            req.check('password','invalid password').isLength({min : 5,max :6});
            req.check('emailid', ` invalid email address`).isEmail().notEmpty();
        }
        req.check('contact','invalid contact number').isLength({min : 10,max :10}).isNumeric({no_symbols: false});
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
            var password = req.body.password;
            var emailid =  req.body.emailid;
            var contact = req.body.contact;
            if(_id!=null){
                UserModel.findOneAndUpdate({
                    _id : _id
                },
                { 
                    name : name,
                    contact  : contact
                }).then(()=>{
                    res.json({
                        success : true,
                        message : `Trainer's Profile updated successfully!`
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Unable to update Trainer's Profile"
                    })
                })
            }
            else{
                UserModel.findOne({'emailid': emailid}).then((user)=>{
                    if(!user){
                        tool.hashPassword(password).then((hash)=>{
                            var tempdata = new UserModel({
                                name : name,
                                password : hash,
                                emailid : emailid,
                                contact  : contact,
                                createdBy : req.user._id
                            })
                            tempdata.save().then(()=>{
                                res.json({
                                    success : true,
                                    message : `Trainer's Profile created successfully!`
                                })
                            }).catch((err)=>{
                                console.log(err);
                                res.status(500).json({
                                    success : false,
                                    message : "Unable to create Trainer's Profile"
                                })
                            })
                        }).catch((err)=>{
                            console.log(err);
                            res.status(500).json({
                                success : false,
                                message : "Unable to create Trainer's Profile"
                            })
                        })
                        
                        
                    }
                    else{
                        res.json({
                            success : false,
                            message : `This id already exists!`
                        })
                    }
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Unable to create Trainer Profile"
                    })
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





let getAllTrainers = (req,res,next)=>{
    if(req.user.type==='ADMIN'){
        UserModel.find({type: 'TRAINER'},{ password: 0, type: 0 }).then((info)=>{
            res.json({
                success : true,
                message : `Success`,
                data : info
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Unable to fetch data"
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



let getSingleTrainer = (req,res,next)=>{
    if(req.user.type==='ADMIN'){
        let _id = req.params._id;
        console.log(_id);
        UserModel.findById(_id,{password: 0, type: 0}).then((info)=>{
            res.json({
                success : true,
                message : `Success`,
                data : info
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Unable to fetch data"
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







module.exports = { trainerRegister, getAllTrainers, getSingleTrainer }