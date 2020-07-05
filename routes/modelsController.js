var express = require('express');
var router = express.Router();
var multer = require('multer');
const UPLOAD_PATH = 'public/models';
const UPLOAD_PATH_IMAGE = 'public/images';
const UPLOAD_PATH_AUDIO = 'public/audio';
var upload = multer({dest: UPLOAD_PATH});
var fs = require('fs');

router.get('/', function (req, res, next) {
    let listFile;
    fs.readdir(UPLOAD_PATH, (err, files) => {
        if (err) {
            res.send(JSON.stringify([]));
        }
        // res.send(JSON.stringify(files));
        let js = JSON.stringify(files);
        // files.forEach(file => {
        //     console.log(file);
        // });
        listFile = files.map((item) => {
            return {
                name: item,
                link: item
            }
        })
        res.send(listFile);

    });
});

router.post('/', upload.single('model'), function (req, res, next) {
    const BASE_URL = req.protocol + '://' + req.get('host');
    const BASE_MODEL_URL = BASE_URL + '/models/';
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path || ''; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    // const fullPathInServ = ;;
    const newFullPath = `${UPLOAD_PATH}/${orgName}`;

    fs.renameSync(fullPathInServ, newFullPath);
    const data = {name: orgName, link: BASE_MODEL_URL + orgName};
    res.send(JSON.stringify(data))
});

router.post('/image', upload.single('image'), function (req, res, next) {
    const BASE_URL = req.protocol + '://' + req.get('host');
    const BASE_MODEL_URL = BASE_URL + '/images/';
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path || ''; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    // const fullPathInServ = ;;
    const newFullPath = `${UPLOAD_PATH_IMAGE}/${orgName}`;

    fs.renameSync(fullPathInServ, newFullPath);
    const data = {name: orgName, link: BASE_MODEL_URL + orgName};
    res.send(JSON.stringify(data))
});
router.post('/audio', upload.single('audio'), function (req, res, next) {
    const BASE_URL = req.protocol + '://' + req.get('host');
    const BASE_MODEL_URL = BASE_URL + '/audio/';
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path || ''; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    // const fullPathInServ = ;;
    const newFullPath = `${UPLOAD_PATH_AUDIO}/${orgName}`;

    fs.renameSync(fullPathInServ, newFullPath);
    const data = {name: orgName, link: BASE_MODEL_URL + orgName};
    res.send(JSON.stringify(data))
});
module.exports = router;
