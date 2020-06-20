var express = require('express');
var router = express.Router();
var passport = require('passport');
var connection = require('../config/dbConnection.js');
// var upload = multer({dest: UPLOAD_PATH});
/* GET home page. */
var multer = require('multer');
const UPLOAD_PATH = 'public/models';
const UPLOAD_PATH_IMAGE = 'public/images';
const UPLOAD_PATH_AUDIO = 'public/audio';
var fs = require('fs');
const Busboy = require('busboy');
const path = require('path')
// var upload = multer({dest: UPLOAD_PATH});
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
const chunkPath = "temp/";

router.get('/', function (req, res, next) {
    // res.render('index.ejs')
    res.render('login.ejs', {message: req.flash('loginMessage')})

});
router.get('/login', function (req, res, next) {
    res.render('login.ejs', {message: req.flash('loginMessage')})
    // res.render('index', { title: 'Express' });

});
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile/1',
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
    res.render('profile.ejs');
});
router.get('/test/2', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('test-2.html', {root: '.'})
});
router.post('/model/chunk/:name/:total/:current', upload.single('model'), function (req, res, next) {
    const chunkPath = "temp/";
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    const BASE_URL = req.protocol + '://' + req.get('host');

    function formating(current) {
        if (parseInt(current) < 10) return `00${current}`
        if (parseInt(current) < 100) return `0${current}`
        return current;
    }

    let fstream = fs.createWriteStream(chunkPath + req.params.name + '-' + formating(req.params.current) + '.tmp');
    fstream.write(processedFile.buffer);
    fstream.end();
    console.log(req.params.current + '/' + req.params.total);
    if (parseFloat(req.params.current) >= parseFloat(req.params.total)) {
        mergeFile(BASE_URL, req.params.name, chunkPath, function (data) {
            res.send(JSON.stringify(data))
        })
    } else {
        res.sendStatus(200)
    }
});

//API function called once all chunks are uploaded
function mergeFile(BASE_URL, filename, chunkDirPath, callback) {

    const uploadDir = `public/models`;
    const fileNameBase = filename.replace(/\.[^/.]+$/, '');
    const chunkDir = chunkDirPath;
    let outputFile = fs.createWriteStream(path.join(uploadDir, filename));
    let fileList;
    fs.readdir(chunkPath, function (error, filenames) {
        if (error) {
            throw new Error('Cannot get upload chunks!');
        }
        // filenames.sort(function (a, b) {
        //     let aS = parseInt(a.slice(-3))
        //     let bS = parseInt(b.slice(-3))
        //     return aS - bS
        // });
        fileList = filenames
        //loop through the temp dir and write to the stream to create a new file
        filenames.forEach(function (tempName) {
            console.log(tempName)
            const data = fs.readFileSync(`${chunkDir}${tempName}`);
            outputFile.write(data);
            //delete the chunk we just handled
            fs.unlinkSync(`${chunkDir}${tempName}`);
        });
        outputFile.end();
        const BASE_MODEL_URL = BASE_URL + '/models/';
        const data = {name: filename, link: BASE_MODEL_URL + filename};
        callback(data)
    });

    //
    // outputFile.on('finish', async function () {
    //     //delete the temp folder once the file is written
    //     fs.unlinkSync(chunkDir);
    // })
}

module.exports = router;
