var express = require("express");
var router = express.Router();

var stopRegistraion = require("../services/registrationlink");

router.post("/registration/stop",stopRegistraion.stopRegistration)
router.post('/result/download',stopRegistraion.Download)
module.exports = router;
