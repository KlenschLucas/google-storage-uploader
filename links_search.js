const cheerio = require('cheerio');
const request = require('request');

const links = [];

const checkLinks = function(base, url, string) {
  // let linksa = [];
  request((base  + url), (err, response, html) => {
    let $ = cheerio.load(html);
    let array = $('a').toArray();
    array.map(linkData => {
      let link = linkData.attribs.href;
      if (link !== undefined) {
        if ((link.includes('/') && !link.includes('../'))) {
          checkLinks((base), (url + link), string);
        }
        if (link.toUpperCase().includes(string.toUpperCase()) &&
            !link.includes('/')) {
          // link.push(link);
          console.log(`${base+url+link}`);
        }
      }
    });
  });
};
checkLinks(process.argv[2],'',process.argv[3]);
