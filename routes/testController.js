var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('test-profile.ejs');
});
router.get('/profile/99', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('inside.ejs');
});
router.get('/2', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('test-2.html', {root: '.'})
});

module.exports = router;
