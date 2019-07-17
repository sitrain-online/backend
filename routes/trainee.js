var express = require("express");
var router = express.Router();

var trainee = require("../services/trainee");
router.post('/enter',trainee.traineeenter);
router.post('/feedback',trainee.feedback);
router.post('/resend/testlink',trainee.resendmail);
router.post('/correct/answers',trainee.correctAnswers);
router.post('/answersheet',trainee.Answersheet);
router.post('/flags',trainee.flags);


module.exports = router;