var http = require('http');
var st = require('st');

var staticFiles = st({ path: __dirname + '/static', url: '/' });

http.createServer(function(req, res) {
  if (staticFiles(req, res)) return
  else res.end('not a static file');
}).listen(3000);

