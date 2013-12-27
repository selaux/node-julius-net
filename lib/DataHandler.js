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

    parser.each('RECOGOUT', function (recognition) {
        var eventData = recognition.$children.map(function (match) {
            return {
                score: parseFloat(match.$.SCORE),
                words: match.$children.map(function (word) {
                    return {
                        word: word.$.WORD,
                        phone: word.$.PHONE,
                        cm: parseFloat(word.$.CM)
                    };
                })
            };
        });
        self.emit('event', {
            name: 'recognition',
            data: eventData
        });
    });
};

util.inherits(DataHandler, EventEmitter);

module.exports = DataHandler;
