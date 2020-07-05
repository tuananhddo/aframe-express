#!/usr/bin/env node
var path = require('path');
var express = require('express');
var router = express.Router();
const authService = require('../service/authService');
const syncRepo = require(path.join(appRoot, 'repo','SyncRepo'))
router.post('/:id/save', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    syncRepo.updateProfileUpdateData(id, changes)
    res.sendStatus(200);
});
router.post('/:id/create', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    syncRepo.updateProfileCreateData(id, changes, function () {
        res.sendStatus(200);
    });

});
router.get('/:id/reset', authService.isLoggedIn, (req, res) => {
    const id = req.params.id;
    syncRepo.resetProfile(id);
    res.sendStatus(200);
});
router.get('/:id/list-create', function (req, res, next) {
    const id = req.params.id;
    syncRepo.getCreateData(id, function (data) {
        res.json(data)
    })
});
router.get('/:id/list-update', function (req, res, next) {
    const id = req.params.id;

    syncRepo.getUpdateData(id, function (data) {
        res.json(data)
    })
});
router.post('/:profileId/delete/:id', (req, res) => {
    console.log(req.params.id)
    const profileId = req.params.profileId;
    req.params.id && profileId && syncRepo.deleteEntity(profileId, req.params.id, function () {
        res.sendStatus(200);
    });
});
module.exports = router;
