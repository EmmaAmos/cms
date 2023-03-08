var express = require('express');
var router = express.Router();
var path = require('path'); // Include the path module

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/Lesson2/index.html'));
});

module.exports = router;
