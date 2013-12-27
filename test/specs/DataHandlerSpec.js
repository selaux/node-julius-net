'use strict';

var through = require('through'),
    sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    sinonChai = require('sinon-chai'),

    DataHandler = require('../../lib/DataHandler');

chai.use(sinonChai);

describe('DataHandler', function () {
    var dataHandler,
        inputStream;

    beforeEach(function () {
        inputStream = through().pause();
        dataHandler = new DataHandler(inputStream);
    });

    it('should trigger the start event on STARTPROC', function (done) {
        inputStream.queue('<STARTPROC/>\n').end();
        dataHandler.on('event', function (event) {
            expect(event).to.deep.equal({
                name: 'start'
            });
            done();
        });
        inputStream.resume();
    });
});
