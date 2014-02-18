var connect = require('connect');
var express = require('express');
var http = require('http');
var app = express();
app.use(app.router);

app.use(express.static(__dirname+ '/web-client/'));

http.createServer(app).listen(8080), function(){
  console.log('Express server listening on port ' + app.get('port'));
};

app.get('/notes', function(req, res)
	{
		res.sendfile(__dirname+ '/web-client/index.html');
	});