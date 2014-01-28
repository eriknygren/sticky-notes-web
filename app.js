var connect = require('connect');
connect.createServer(
    connect.static(__dirname+ '/web-client/')
).listen(8080);