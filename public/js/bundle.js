// Request to merge all of the file chunks into one file
app.get('*/api/CelerFTFileUpload/MergeAll*', function (request, response) {

    if (request.method === 'GET') {

        // Get the extension from the file name
        var extension = path.extname(request.param('filename'));

        // Get the base file name
        var baseFilename = path.basename(request.param('filename'), extension);

        var localFilePath = uploadpath + request.param('directoryname') + '/' + baseFilename;

        // Check if all of the file chunks have be uploaded
        // Note we only wnat the files with a *.tmp extension
        var files = getfilesWithExtensionName(localFilePath, 'tmp')

        /*if (err) {
            response.status(500).send(err);
            return;
        }*/

        if (files.length != request.param('numberOfChunks')) {

            response.status(400).send('Number of file chunks less than total count');
            return;
        }

        var filename = localFilePath + '/' + baseFilename + extension;
        var outputFile = fs.createWriteStream(filename);

        // Done writing the file
        // Move it to top level directory
        // and create MD5 hash
        outputFile.on('finish', function () {
            console.log('file has been written');

            // New name for the file
            var newfilename = uploadpath + request.param('directoryname') + '/' + baseFilename
            + extension;

            // Check if file exists at top level if it does delete it
            //if (fs.ensureFileSync(newfilename)) {
            fs.removeSync(newfilename);
            //}

            // Move the file
            fs.move(filename, newfilename , function (err) {
                if (err) {
                    response.status(500).send(err);
                    return;
                }
                else {

                    // Delete the temporary directory
                    fs.removeSync(localFilePath);
                    var hash = crypto.createHash('md5'),
                        hashstream = fs.createReadStream(newfilename);

                    hashstream.on('data', function (data) {
                        hash.update(data)
                    });

                    hashstream.on('end', function () {

                        var md5results = hash.digest('hex');

                        // Send back a sucessful response with the file name
                        response.status(200).send('Sucessfully merged file ' + filename + ", "
                        + md5results.toUpperCase());
                        response.end();
                    });
                }
            });


        });

        // Loop through the file chunks and write them to the file
        // files[index] retunrs the name of the file.
        // we need to add put in the full path to the file
        for (var index in files) {

            console.log(files[index]);
            var data = fs.readFileSync(localFilePath + '/' + files[index]);
            outputFile.write(data);
            fs.removeSync(localFilePath + '/' + files[index]);
        }

        outputFile.end();

    }
});
