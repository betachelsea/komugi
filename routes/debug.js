var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/kashiwa', function(req, res, next) {
  res.send('kashiwa test page!');
});

router.get('/any_user', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
