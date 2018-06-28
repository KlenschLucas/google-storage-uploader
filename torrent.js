const WebTorrent = require('webtorrent');
const ProgressBar = require('progress');

const client = new WebTorrent();

module.exports.download  = (magnetURI) => {
  let bar = new ProgressBar('Downloading |:bar | :percent | Time Elapsed: :elapsed', { total: 100 });
  client.add(magnetURI, { path: './downloads/' }, function (torrent) {
    torrent.on('done', function () {
      console.log('Torrent download finished');
      process.exit();
    });
    torrent.on('download', function (bytes) {
      bar.update(torrent.progress);
    });
  });
};