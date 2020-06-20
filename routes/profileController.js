#!/usr/bin/env node

var express = require('express');
var router = express.Router();
const authService = require('./../service/authService');
const profileRepo = require('./../repo/profile')

router.post('/:id/save', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    profileRepo.updateProfileUpdateData(id, changes)
    // syncService.sync(changes);
    res.sendStatus(200);
});
router.post('/:id/create', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    // userRepo.updateUserCreateData(req.user, changes);
    profileRepo.updateProfileCreateData(id, changes);

    // syncService.syncCreate(changes);
    res.sendStatus(200);
});
router.get('/:id/list-create', function (req, res, next) {
    // res.json(userRepo.getCreateData(req.user.username)
    let data = [];
    const id = req.params.id;

    profileRepo.getCreateData(id, function (data) {
        res.json(data)
    })
});
router.get('/:id/list-update', function (req, res, next) {
    // res.json(userRepo.getCreateData(req.user.username)
    let data = {};
    const id = req.params.id;

    profileRepo.getUpdateData(id, function (data) {
        res.json(data)
    })
});
router.post('/:profileId/delete/:id', (req, res) => {
    console.log(req.params.id)
    const profileId = req.params.profileId;
    req.params.id && profileId && profileRepo.deleteEntity(profileId, req.params.id, function () {
        res.sendStatus(200);
    });
    // res.sendStatus(400);
});
module.exports = router;
