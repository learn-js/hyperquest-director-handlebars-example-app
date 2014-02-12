var request = require('hyperquest');

var req = request('http://seattlewiki.net/api/page?format=json');
req.pipe(process.stdout);