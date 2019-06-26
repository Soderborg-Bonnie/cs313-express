var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// welcome page
router.get('/', (req, res) => res.render('welcome'));

module.exports = router;
