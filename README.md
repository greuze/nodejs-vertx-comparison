# nodejs-vertx-comparison
Comparison between node.js and vert.x, for performance tests

Vert.x server reads the file and returns in about 1-3 ms, and so do node.js server (for files smaller than 64KB, setNoDelay(true) must be called in the connection socket, in order to avoid long response times).

This tests are only samples, and must not be considered as serious performance tests.
