/* eslint no-var: 0 */
// this file is intentionally kept non-es6
// so it can be run with plain "node" without worries

var net = require('net');

process.stdin.pipe(net.connect(process.argv[2]));
