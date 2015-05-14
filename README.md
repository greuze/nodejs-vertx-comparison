# nodejs-vertx-comparison
Comparison between node.js and vert.x, for performance tests

Vert.x server reads the file and returns in about 1-3 ms, so do node.js server, but only if the file plus headers are bigger than 64K (for smaller files, it last about 38-40 ms).

For much bigger files (about 5MB), node.js much faster.

This tests are only samples, and must not be considered as serious performance tests.
