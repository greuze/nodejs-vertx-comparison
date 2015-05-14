var vertx = require('vertx');

var NO_CACHE = true;
var fileCache;
var sendFile = function(req, file) {
    req.response.headers['Content-Length'] = file.length();
    req.response.headers['Content-Type'] = 'text/html';
    req.response.end(file);
}
vertx.createHttpServer().requestHandler(function(req) {
    if (NO_CACHE || fileCache == undefined) {
        vertx.fileSystem.readFile('index.html', function(err, file) {
            fileCache = file;
            sendFile(req, fileCache);
        });
    } else {
        sendFile(req, fileCache);
    }
}).listen(8080, 'localhost');