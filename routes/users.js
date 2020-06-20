var express = require('express');
var router = express.Router();
const authService = require('./../service/authService');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/profilex', authService.isLoggedIn, function (req, res, next) {
    console.log(req.user);
    res.render('profile.ejs');
});

router.get('/profile/all', authService.isLoggedIn, function (req, res, next) {
    console.log(req.user);
    res.render('profile.ejs', {listProfile: []});
});
router.get('/profile/:id', authService.isLoggedIn, function (req, res, next) {
    console.log(req.user);
    res.render('profile.ejs');
});
module.exports = router;
