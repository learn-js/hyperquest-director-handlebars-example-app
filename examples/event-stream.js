var request = require('hyperquest');
var wait = require('event-stream').wait;

var api = 'http://localwiki.net/api/v4/';
var tag = 'pizza';
var pagesRequest = request(api + 'pages/?region__slug=seattle&tags=' + tag + '&format=json');

pagesRequest
  .pipe(wait(function(err, data){
    var pages = JSON.parse(data).results;

    var pageTitles = '';
    for (var i=0; i<pages.length; i++){
      pageTitles += pages[i].name + ', ';
    }

    console.log('pages tagged with ' + tag + ': ' + pageTitles);
  }));
