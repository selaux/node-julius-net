'use strict';

var sandboxedModule = require('sandboxed-module'),
    sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Julius', function () {
    describe('constructor', function () {
        var netStub = {},
            Julius = sandboxedModule.require('../../lib/Julius', {
                requires: {
                    net: netStub
                }
            });

        beforeEach(function () {
            netStub.connect = sinon.stub();
        });

        it('should connect to 127.0.0.1:10500 by default', function () {
            var julius = new Julius();
            expect(netStub.connect).to.have.been.calledWith({
                host: '127.0.0.1',
                port: 10500
            });
        });

        it('should connect to the given host and port', function () {
            var options = {
                    host: 'some.host',
                    port: 1
                },
                julius = new Julius(options);
            expect(netStub.connect).to.have.been.calledWith(options);
        });
    });
});
