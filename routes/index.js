var express = require('express');
var router = express.Router();
var multer = require('multer');
const UPLOAD_PATH = 'public/models';
var passport = require('passport');
var connection = require('../config/dbConnection.js');
// var upload = multer({dest: UPLOAD_PATH});
/* GET home page. */

router.get('/', function (req, res, next) {
    // res.render('index.ejs')
    res.render('login.ejs', {message: req.flash('loginMessage')})

});
router.get('/login', function (req, res, next) {
    res.render('login.ejs', {message: req.flash('loginMessage')})
    // res.render('index', { title: 'Express' });

});
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/login',
}));
router.get('/signup', function (req, res, next) {
    res.render('signup.ejs', {message: req.flash('signupMessage')});
});
// Xử lý form đăng ký ở đây
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: 'users/profile', // Điều hướng tới trang hiển thị profile
    failureRedirect: '/signup', // Trở lại trang đăng ký nếu lỗi
    failureFlash: true
}));
router.get('/logout', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    req.logout();
    res.redirect('/login');
});
router.get('/test', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('index.ejs', {root: '.'})
});
router.get('/test/2', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('test.html', {root: '.'})
});
router.get('/db', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    var sql = "SELECT * FROM user";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
});

module.exports = router;
