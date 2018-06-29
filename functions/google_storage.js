const Storage = require('@google-cloud/storage');

const config = require('../config');

// Constants
const bucketName = config.google_config.bucket_name;
const project_id = config.google_config.project_id;
const downloadsFolder = config.downloadsFolder;

// Creates a client for google storage
const storage = new Storage(
    {
      project_id: project_id,
      bucket_name: bucketName,
    },
);

// Upload file to google storage
module.exports.upload = function(filename) {
  storage.bucket(bucketName).upload((downloadsFolder + filename)).then(() => {
    console.log(`${filename} uploaded to ${bucketName}`);
  }).catch(err => {
    console.error('ERROR:', err);
  });
};
