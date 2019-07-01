var express = require("express");
var router = express.Router();

var testpaper = require("../services/testpaper");

router.post('/create',testpaper.createEditTest);
module.exports = router;
