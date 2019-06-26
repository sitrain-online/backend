let userdetails = (req,res,next)=>{
    res.json({
        success : true,
        message : 'successfull',
        user: {
            name : user.name,
            type: user.type,
            _id : user._id,
            emailid : user.emailid,
            contact : user.contact
        }
    })
}

module.exports={userdetails}