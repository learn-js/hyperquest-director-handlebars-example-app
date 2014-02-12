var fs = require('fs');
var http = require('http');
var st = require('st');
var director = require('director');
var request = require('hyperquest');
var combine = require('combine-streams');
var wait = require('event-stream').wait;
var Handlebars = require('handlebars');
var hbsLayouts = require('handlebars-layouts')(Handlebars);

var wiki = {
	name: 'SeattleWiki.net',
	url: 'http://seattlewiki.net',
  api: 'http://seattlewiki.net/api/'
}

Handlebars.registerPartial('layout', fs.readFileSync('views/layout.html').toString());

var templates = {
	index: getView('index'),
	page: getView('page')
}

var port = process.env.PORT || 3000;
var router = 	new director.http.Router();
var staticFiles = st({ path: __dirname + '/static', url: '/static', passthrough: true })

var server = http.createServer(function(req, res){

	/* 
	* if the request is for a static file, handle it here
	*/
	if (staticFiles(req, res)) return;

	/*
	* otherwise, let the router handle the request
	*/
	router.dispatch(req, res, function(err){
    if (err) {
      res.writeHead(404);
      res.end();
    }
  });
});

router.get('/', function(){
	var html = templates.index({ wiki: wiki });
  this.res.writeHead(200, { 'Content-Type': 'text/html' });
	this.res.end(html);
});

router.get('/:id', function(id){
	var self = this;
	var tagRequest = request(wiki.api + 'tag/' + id + '?format=json');
	var pagesRequest = request(wiki.api + 'page/?page_tags__tags__slug=' + id + '&limit=0&format=json');

	combine()
		.append(tagRequest)
		.append(' -^- ')
		.append(pagesRequest)
		.append(null)
		.pipe(wait(function(err, data){
			var json = data.split(' -^- ');
			var html = templates.page({ 
				wiki: wiki, 
				tag: JSON.parse(json[0]), 
				pages: JSON.parse(json[1]).objects 
			});
		  self.res.writeHead(200, { 'Content-Type': 'text/html' });
			self.res.end(html);
		}));
});

server.listen(port);
console.log('app running on http://127.0.0.1:' + port);

/*
* helper function for pulling in a handlebars template
*/
function getView(file){
	return Handlebars.compile(fs.readFileSync('./views/' + file + '.html').toString());
}