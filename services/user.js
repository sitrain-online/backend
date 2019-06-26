let userdetails = (req,res,next)=>{
    res.json({
        success : true,
        message : 'successfull',
        user : req.user
    })
}

module.exports={userdetails}