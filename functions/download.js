// Dependencies
const url = require('url');

const http = require('http');
const fs = require('fs');
const config = require('../config');

// Declare Folders for Uploads and Downloads of files
const downloadsFolder = config.downloadsFolder;

// Function to download file to Server using HTTP.get
module.exports.downloadFile = function(file_url, filename) {
  let options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname,
  };

  let file = fs.createWriteStream(downloadsFolder + filename);

  http.get(options, function(res) {
    res.on('data', function(data) {
      file.write(data);
    }).on('end', function() {
      file.end();
      console.log(filename + ' downloaded to ' + downloadsFolder);
    });
  });
};

// Delete File from Server
module.exports.deleteFile = function(filename) {
  fs.unlink(downloadsFolder + filename, (err) => {
    if (err) throw err;
    console.log(`${filename} deleted from Server`);
  });
};