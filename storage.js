// Dependencies
const url = require('url');
const Storage = require('@google-cloud/storage');
const http = require('http');
const fs = require('fs');

const config = require('./config');

// Constants
const bucketName = config.google_config.bucket_name;
const project_id = config.google_config.project_id;

// Creates a client for google storage
const storage = new Storage(
    // {
    //     project_id: project_id,
    //     bucket_name: bucketName
    // }
);

// Declare Folders for Uploads and Downloads of files
const uploadsFolder = './';


// Function to download file to Server using HTTP.get
// First Function
const upload_google = function(file_url, filename, cb) {
    let options = {
        host: url.parse(file_url).host,
        port: 80,
        path: url.parse(file_url).pathname
    };

    let file = fs.createWriteStream(uploadsFolder + filename);

    http.get(options, function(res) {
        res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            console.log(filename + ' downloaded to ' + uploadsFolder);
            fileUploadGoogle(filename, cb);
        });
    });
};

// Google Upload and Download Functions
// Upload file from server to google storage
// Second Function
const fileUploadGoogle = function (filename, cb) {
    storage
        .bucket(bucketName)
        .upload((uploadsFolder+filename))
        .then(() => {
            console.log(`${filename} uploaded to ${bucketName}`);
            fileDeleteServer(filename, cb);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
};
// Delete File from Server
// Third Function
const fileDeleteServer = function (filename, cb) {
    fs.unlink(uploadsFolder+filename, (err) => {
        if (err) throw err;
        console.log(`${filename} deleted from Server`);

        cb();
    });
};

upload_google(process.argv[2],process.argv[3]);