// #!/usr/bin/env node
//
// var express = require('express');
// var router = express.Router();
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const glob = require('glob');
// const syncService = require('./../service/syncService');
// let files = syncService.getWorkingFiles();
// const authService = require('./../service/authService');
// const userRepo = require('./../repo/User')
// const profileRepo = require('./../repo/profile')
//
// router.post('/create', (req, res) => {
//     const changes = req.body;
//     console.log(changes)
//     // Accepted.
//     // userRepo.updateUserCreateData(req.user, changes);
//     userRepo.updateUserCreateData({username: 'demo', createData: ''}, changes);
//     res.sendStatus(200);
// });
// router.post('/save', (req, res) => {
//     const changes = req.body;
//     // userRepo.updateUserData(req.user, changes);
//     userRepo.updateUserData({username: 'demo'}, changes);
//     // profileRepo.updateProfileUpdateData()
//     // Accepted.
//     // syncService.sync(changes);
//     res.sendStatus(200);
// });
// router.get('/list-create', authService.isLoggedIn, function (req, res, next) {
//     // res.json(userRepo.getCreateData(req.user.username)
//     let data = [];
//     userRepo.getCreateData(req.user.username, function (data) {
//         res.send(data)
//     })
// });
// router.get('/list-update', authService.isLoggedIn, function (req, res, next) {
//     // res.json(userRepo.getCreateData(req.user.username)
//     let data = {};
//     userRepo.getUpdateData(req.user.username, function (data) {
//         res.send(data)
//     })
// });
// router.post('/delete/:id', authService.isLoggedIn, (req, res) => {
//     console.log(req.params.id)
//     req.params.id && userRepo.deleteEntity(req.user.username, req.params.id, function () {
//         res.sendStatus(200);
//     });
//     // res.sendStatus(400);
// });
// module.exports = router;
