'use strict';

var net = require('net'),
    Julius;

Julius = function (options) {
    options = options || {};
    options.host = options.host || '127.0.0.1';
    options.port = options.port || 10500;

    this.socket = net.connect(options);
};

module.exports = Julius;