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

var app = express();
app.use(helmet());
app.use(expressValidator());
//import other files
var mongoose = require("./services/connection");
var admin = require("./routes/admin");
var login = require("./routes/login");



//configs
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//passport
app.use(passport.initialize());
app.use(passport.session());


//bind routes
app.use("/api/v1/admin",passport.authenticate('user-token', { session : false }),admin);
app.use('/api/v1/login',login)






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