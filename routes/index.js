var express = require('express');
var router = express.Router();
const path = require('path');
/* GET home page. */

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile('index.html',{root: '.'})
});
router.get('/test', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile('test.html',{root: '.'})
});
module.exports = router;
