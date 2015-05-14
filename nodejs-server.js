var http = require('http');
var fs = require('fs');

var NO_CACHE = true;
var fileCache;
var sendFile = function(conn, file) {
    conn.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': file.length});
    conn.write(file);
    conn.end();
}
http.createServer(function (req, res) {
    if (NO_CACHE || fileCache == undefined) {
        fs.readFile('index.html', function(err, file) {
        fileCache = file;
        sendFile(res, fileCache);
        });
    } else {
        sendFile(res, fileCache);
    }
}).listen(8080, 'localhost');