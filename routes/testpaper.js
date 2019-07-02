var express = require("express");
var router = express.Router();

var testpaper = require("../services/testpaper");

router.post('/create',testpaper.createEditTest);
router.get('/details/:_id',testpaper.getSingletest);
router.post('/details/all',testpaper.getAlltests);
router.post('/delete',testpaper.deleteTest);
module.exports = router;
