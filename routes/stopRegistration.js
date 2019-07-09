var express = require("express");
var router = express.Router();

var stopRegistraion = require("../services/registrationlink");

router.post("/registraion/stop",stopRegistraion.stopRegistration)
module.exports = router;
