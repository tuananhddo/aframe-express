var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function (req, res, next) {
    res.render('login.ejs', {message: req.flash('loginMessage')})
});
router.get('/login', function (req, res, next) {
    res.render('login.ejs', {message: req.flash('loginMessage')})
    // res.render('index', { title: 'Express' });
});
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile/all',
    failureRedirect: '/login',
}));
router.get('/signup', function (req, res, next) {
    res.render('signup.ejs', {message: req.flash('signupMessage')});
});
// Xử lý form đăng ký ở đây
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile/all', // Điều hướng tới trang hiển thị profile
    failureRedirect: '/signup', // Trở lại trang đăng ký nếu lỗi
    failureFlash: true
}));
router.get('/logout', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    req.logout();
    res.redirect('/login');
});
module.exports = router;
