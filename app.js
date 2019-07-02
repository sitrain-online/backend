const PORT = process.env.PORT || 5000
var createError = require('http-errors');
var express = require('express');
const helmet = require('helmet')
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var passport = require("./services/passportconf");
var tool = require("./services/tool");
var upload = require("express-fileupload");
var app = express();


app.use(helmet());
app.use(upload());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin");
    next();
});

app.use(expressValidator());
//import other files
var mongoose = require("./services/connection");
var admin = require("./routes/admin");
var login = require("./routes/login");
var user = require("./routes/user");
var universal = require("./routes/universal");
var question = require("./routes/questions");
var testpaper = require("./routes/testpaper");



//configs
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next)=>{
    console.log(req.body);
    next();
})
//passport
app.use(passport.initialize());
app.use(passport.session());

//file-uploads
app.post("/",function(req,res){
    if(req.files){
        var file = req.files.filename,
        var filename = file.name;
        file.mv ("./uploads" + filename,function(err){
            if(err) {
                console.log(err)
                res.send("unable to upload file!")
            }
            else{
                res.json({
                    success : true,
                    message : "File has been uploaded"
                })
            }
        })
    }

})


//bind routes
app.use("/api/v1/admin",passport.authenticate('user-token', { session : false }),admin);
app.use("/api/v1/user",passport.authenticate('user-token', { session : false }),user);
app.use('/api/v1/subject',passport.authenticate('user-token', { session : false }),universal);
app.use('/api/v1/questions',passport.authenticate('user-token', { session : false }),question);
app.use('/api/v1/test',passport.authenticate('user-token', { session : false }),testpaper);


app.use('/api/v1/login',login);








//error handlings
app.use(function(req, res, next) {
    next(createError(404,"Invalid API"));
});

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status).json({
        success : false,
        message : err.message
    });
});

app.listen(PORT,(err)=>{
    if(err){
      console.log(err);
    }
    console.log(`Running at port ${PORT}`);
});