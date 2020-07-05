var express = require('express');
var router = express.Router();
const authService = require('./../service/authService');
const userService = require('./../service/userService');

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
    userService.getLisProfile(req.user, function (profiles) {
        console.log(profiles)
        res.render('list_profile.ejs', {listProfile: profiles, user: req.user});
    })

});
router.get('/profile/:name', function (req, res, next) {
    console.log(req.user);
    userService.getProfileByNameAndUser(req.user, req.params.name, function (profile) {
        console.log('------------')
        console.log(profile)
        if (!!profile) {
            res.render('profile.ejs', {profileId: profile.id})
        } else {
            res.render('error.ejs');
        }
    })
    // res.render('profile.ejs', {profileId: 1998});

});
router.post('/profile/create', function (req, res, next) {
    userService.createProfile(req, function (profile) {
        res.json(profile)
    })
})
module.exports = router;
