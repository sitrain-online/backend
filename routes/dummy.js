var express = require("express");
var router = express.Router();

var dummy = require("../services/dummy");
router.post('./domain', dummy.dummy);
module.exports = router;