var express = require('express');
var router = express.Router();
var multer = require('multer');
const UPLOAD_PATH = 'public/models';

// var upload = multer({dest: UPLOAD_PATH});
/* GET home page. */

router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('index.html', {root: '.'})
});
router.get('/test', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('test.html', {root: '.'})
});
router.get('/test/2', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('test.html', {root: '.'})
});
router.get('/test/3', function (req, res, next) {

    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: '3d-model-cdn', // pass your bucket name
            Key: 'a.blend', // file will be saved as testBucket/contacts.csv
            ACL: "public-read",
            Body: JSON.stringify(data, null, 2),
        };

        s3.upload(params, function (s3Err, data) {
            if (s3Err) {
                console.log(s3Err, data);
                throw s3Err
            }
            console.log(`File uploaded successfully at ${data.Location}`)
        });
    });
    // Load the AWS SDK for Node.js
//     var AWS = require('aws-sdk');
// // Set the region
// //     AWS.config.update({region: 'REGION'});
//     AWS.config.loadFromPath('./config.json');
//
// // Create S3 service object
//     s3 = new AWS.S3({apiVersion: '2006-03-01',});
//
// // Call S3 to list the buckets
//     s3.listBuckets(function (err, data) {
//         if (err) {
//             console.log("Error", err);
//         } else {
//             console.log("Success", data.Buckets);
//         }
//     });
    res.sendFile('test-2.html', {root: '.'})
});

module.exports = router;
