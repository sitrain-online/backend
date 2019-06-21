const PORT = process.env.PORT || 5000
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var mongoose = require("./services/connection");

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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