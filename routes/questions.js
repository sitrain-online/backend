var express = require("express");
var router = express.Router();

var questions = require("../services/trainerFunctions");


router.post('/create',questions.createEditquestion);
router.post('/details/all',questions.getAllQuestions);
router.post('/details/:_id',questions.getSingleQuestion);

module.exports=router;

