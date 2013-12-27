'use strict';

var util = require('util'),
    EventEmitter = require('events').EventEmitter,

    xmlParser = require('xml-object-stream'),
    DataHandler;

DataHandler = function (stream) {
    var self = this,
        parser = xmlParser.parse(stream);

    parser.each('STARTPROC', function () {
        self.emit('event', { name: 'start' });
    });
};

util.inherits(DataHandler, EventEmitter);

module.exports = DataHandler;
