'use strict';

var net = require('net'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,

    DataHandler = require('./DataHandler'),
    Julius;

Julius = function (options) {
    var self = this;

    options = options || {};
    options.host = options.host || '127.0.0.1';
    options.port = options.port || 10500;

    this.socket = net.connect(options);
    this.dataHandler = new DataHandler();

    this.socket.on('error', function (err) {
        self.emit('error', err);
    });
    this.socket.on('data', function (data) {
        self.dataHandler.write(data);
    });
};

util.inherits(Julius, EventEmitter);

module.exports = Julius;