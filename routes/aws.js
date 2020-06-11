var express = require('express');
var router = express.Router();
var multer = require('multer');
const UPLOAD_PATH = 'public/models';
const fs = require('fs');
const AWS = require('aws-sdk');
const author = {
    accessKeyId: "AKIAYC6BLD5ZIO7LL6CV",
    secretAccessKey: "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",
    region: "ap-southeast-1"
}
const s3 = new AWS.S3({
    accessKeyId: author.accessKeyId,
    secretAccessKey: author.secretAccessKey,
    region: author.region
});
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
router.post('/', upload.single('model'), function (req, res, next) {

    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-");

    const params = {
        Bucket: '3d-model-cdn', // pass your bucket name
        Key: processedFile.originalname, // file will be saved as testBucket/contacts.csv
        ACL: "public-read",
        Body: processedFile.buffer
        // Body: JSON.stringify(data, null, 2),
    };

    s3.upload(params, function (s3Err, data) {
        if (s3Err) {
            console.log(s3Err, data);
            throw s3Err
        }
        console.log(`File uploaded successfully at ${data.Location}`)
        const resData = {name: orgName, link: data.Location};
        res.send(JSON.stringify(resData))
    });
    // const data = {name: orgName, link: orgName};
    // res.send(JSON.stringify(data))
});


module.exports = router;
