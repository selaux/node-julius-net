'use strict';

var util = require('util'),
    EventEmitter = require('events').EventEmitter,

    parseXML = require('xml2js').parseString,
    DataHandler;

DataHandler = function (stream) {
    var self = this,
        containsToMethodMap = {
            '<STARTPROC': self.handleStartProcessingTag,
            '<STARTRECOG': self.handleStartRecognitionTag,
            '<ENDRECOG': self.handleEndRecognitionTag,
            '<RECOGFAIL': self.handleRecognitionFailTag,
            '<RECOGOUT': self.handleOpeningRecognitionTag,
            '</RECOGOUT': self.handleClosingRecognitionTag
        };

    stream.on('data', function (data) {
        var dataHandled = false;
        data = data.toString();

        Object.keys(containsToMethodMap).forEach(function (key) {
            if (data.indexOf(key) !== -1) {
                containsToMethodMap[key].call(self, data);
                dataHandled = true;
            }
        });

        if (!dataHandled) {
            self.handleAnyData(data);
        }
    });
};

util.inherits(DataHandler, EventEmitter);

DataHandler.prototype.handleStartProcessingTag = function () {
    this.emit('event', { name: 'startProcessing' });
};

DataHandler.prototype.handleStartRecognitionTag = function () {
    this.emit('event', { name: 'startRecognition' });
};

DataHandler.prototype.handleEndRecognitionTag = function () {
    this.emit('event', { name: 'endRecognition' });
};

DataHandler.prototype.handleRecognitionFailTag = function () {
    this.emit('event', { name: 'recognitionFail' });
};

DataHandler.prototype.handleOpeningRecognitionTag = function (data) {
    this.buffer = data;
};

DataHandler.prototype.handleAnyData = function (data) {
    if (this.buffer) {
        this.buffer += data;
    }
};

DataHandler.prototype.handleClosingRecognitionTag = function (data) {
    var self = this,
        xml = (this.buffer === data) ? this.buffer : this.buffer + data,
        eventData;

    this.buffer = '';

    parseXML(xml, { strict: false, explicitArray: true }, function (err, recognition) {
        eventData = recognition.RECOGOUT.SHYPO.map(function (match) {
            return {
                score: parseFloat(match.$.SCORE),
                words: match.WHYPO.map(function (word) {
                    return {
                        word: word.$.WORD,
                        phone: word.$.PHONE,
                        cm: parseFloat(word.$.CM)
                    };
                })
            };
        });
        self.emit('event', {
            name: 'recognitionSuccess',
            data: eventData
        });
    });
};

module.exports = DataHandler;
