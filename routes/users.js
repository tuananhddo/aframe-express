var express = require('express');
var router = express.Router();
const authService = require('./../service/authService');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/profile', authService.isLoggedIn, function (req, res, next) {
    console.log(req.user);
    res.render('profile.ejs', {message: req.flash('signupMessage')});
});



module.exports = router;
