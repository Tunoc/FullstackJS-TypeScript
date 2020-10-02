var express = require('express');
var router = express.Router();

/* GET home page. */
const persons = ["Peter", "Ida", "Jan"];
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', persons });
});

module.exports = router;
