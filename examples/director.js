var http = require('http');
var director = require('director');

var port = process.env.PORT || 3000;
var router = 	new director.http.Router();

var server = http.createServer(function(req, res){
	router.dispatch(req, res, function(err){
    if (err) {
      res.writeHead(404);
      res.end();
    }
  });
});

router.get('/', function(){
  this.res.writeHead(200, { 'Content-Type': 'text/html' });
	this.res.end('the root url');
});

server.listen(port);
console.log('app running on http://127.0.0.1:' + port);