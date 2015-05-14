var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('Master will create %d workers', numCPUs);

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.id + ' is online (' + worker.process.pid + ')');
    });
    
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.id + ' died (' + worker.process.pid + ')');
    });
} else {
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
        req.socket.setNoDelay(true);
        if (NO_CACHE || fileCache == undefined) {
            fs.readFile('index.html', function(err, file) {
            fileCache = file;
            sendFile(res, fileCache);
            });
        } else {
            sendFile(res, fileCache);
        }
    }).listen(8080, 'localhost');
}