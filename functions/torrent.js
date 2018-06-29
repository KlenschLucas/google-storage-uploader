const WebTorrent = require('webtorrent');
const ProgressBar = require('progress');

const client = new WebTorrent();

module.exports.download = (magnetURI) => {

  let bar = new ProgressBar(
      `Downloading |:bar | :percent | Time Elapsed: :elapsed | Download speed: :rate`, {total: 100});
  // Add a magnetURI to start the torrent download
  client.add(magnetURI, {path: './downloads/'}, function(torrent) {
    // Creates the progress bar on the console

    // When torrent is done log and exit
    torrent.on('done', function() {
      console.log('Torrent download finished');
      process.exit();
    });

    // Update Progress bar
    torrent.on('download', function() {
      bar.update(torrent.progress);
    });
  });
};