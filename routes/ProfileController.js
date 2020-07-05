var express = require('express');
var router = express.Router();
const authService = require('./../service/authService');
const profileService = require('./../service/profileService');

router.get('/all', authService.isLoggedIn, function (req, res, next) {
    console.log(req.user);

    profileService.getLisProfile(req.user, function (profiles) {
        res.render('list_profile.ejs', {listProfile: profiles, user: req.user});
    })

});
router.get('/:name', function (req, res, next) {
    console.log(req.user);
    profileService.getProfileByNameAndUser(req.user, req.params.name, function (profile) {
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
router.post('/create', function (req, res, next) {
    profileService.createProfile(req, function (profile) {
        if (!profile) {
            res.sendStatus(320)
        } else {
            res.json(profile)
        }

    })
})
router.post('/delete', function (req, res, next) {
    profileService.deleteProfile(req, function (profile) {
        if (!profile) {
            res.sendStatus(320)
        } else {
            res.json({code: '01'})
        }
    })
})
module.exports = router;
