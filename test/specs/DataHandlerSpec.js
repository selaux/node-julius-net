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

    it('should trigger the recognition event on RECOGOUT', function (done) {
        var xml =   '<RECOGOUT>' +
                        '<SHYPO RANK="1" SCORE="-3549.97">' +
                            '<WHYPO WORD="Some" CLASSID="something" PHONE="p h o n e 1" CM="0.914"/>' +
                            '<WHYPO WORD="Words" CLASSID="else" PHONE="p h o n e 2" CM="1"/>' +
                        '</SHYPO>' +
                    '</RECOGOUT>';
        inputStream.queue(xml).end();
        dataHandler.on('event', function (event) {
            expect(event).to.deep.equal({
                name: 'recognition',
                data: [
                    {
                        score: -3549.97,
                        words: [
                            { word: 'Some', phone: 'p h o n e 1', cm: 0.914 },
                            { word: 'Words', phone: 'p h o n e 2', cm: 1 }
                        ]
                    }
                ]
            });
            done();
        });
        inputStream.resume();
    });
});
