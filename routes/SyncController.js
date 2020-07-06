#!/usr/bin/env node
var path = require('path');
var express = require('express');
var router = express.Router();
const authService = require('../service/authService');
const syncService = require(path.join(appRoot, 'service','syncService'))

router.post('/:id/save', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    syncService.updateProfileUpdateData(id, changes)
    res.sendStatus(200);
});
router.post('/:id/create', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    syncService.updateProfileCreateData(id, changes, function () {
        res.sendStatus(200);
    });

});
router.post('/:id/reset', authService.isLoggedIn, (req, res) => {
    const id = req.params.id;
    syncService.resetProfile(id);
    res.sendStatus(200);
});
router.get('/:id/list-create', function (req, res, next) {
    const id = req.params.id;
    syncService.getCreateData(id, function (data) {
        res.json(data)
    })
});
router.get('/:id/list-update', function (req, res, next) {
    const id = req.params.id;

    syncService.getUpdateData(id, function (data) {
        res.json(data)
    })
});
router.post('/:profileId/delete/:id', (req, res) => {
    console.log(req.params.id)
    const profileId = req.params.profileId;
    req.params.id && profileId && syncService.deleteEntity(profileId, req.params.id, function () {
        res.sendStatus(200);
    });
});
module.exports = router;
