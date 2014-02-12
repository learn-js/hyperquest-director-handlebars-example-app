var request = require('hyperquest');
var combine = require('combine-streams');
var wait = require('event-stream').wait;

var wiki = 'http://seattlewiki.net/api/';

var id ='pizza';
var tagRequest = request(wiki + 'tag/' + id + '?format=json');
var pagesRequest = request(wiki + 'page/?page_tags__tags__slug=' + id + '&limit=0&format=json');

combine()
	.append(tagRequest)
	.append(' -^- ')
	.append(pagesRequest)
	.append(null)
	.pipe(wait(function(err, data){
		console.log(typeof data === 'string')
		var arr = data.split(' -^- ');
		var tag = JSON.parse(arr[0]);
		var pages = JSON.parse(arr[1]).objects;

		var pageTitles = '';
		for (var i=0; i<pages.length; i++){
			pageTitles += pages[i].name + ', ';
		}

	  console.log('the tag: ' + tag.name);
	  console.log('pages tagged with this tag: ' + pageTitles);
	}));