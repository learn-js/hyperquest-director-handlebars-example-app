var fs = require('fs');
var http = require('http');
var director = require('director');

var Handlebars = require('handlebars');
var hbsLayouts = require('handlebars-layouts')(Handlebars);

Handlebars.registerPartial('layout', fs.readFileSync('views/layout.html').toString());
var template = Handlebars.compile(fs.readFileSync('views/index.html').toString());

var site = {
	title: "Exampal usage of Handlebars",
	description: "Learn to use handlebars with node.js!"
}

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
	var page = {
		title: "This is the index page",
		content: "This is the fornt page of the example handlebars site."
	}

  this.res.writeHead(200, { 'Content-Type': 'text/html' });
	this.res.end(template({ site: site, page: page }));
});

server.listen(port);
console.log('app running on http://127.0.0.1:' + port);