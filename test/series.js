'use strict';

var BB = require('bluebird'),
    chai = require('chai'),
    should = chai.should();

describe('Running functions in series', function() {

    it('can start a promise chain with a synchronous method using resolve', function(done) {

        BB
            .resolve(returnFive())
            .then(function(fiver) {
                fiver.should.equal(5);
                //6..should.equal(2);
            })
            .then(done)
            .catch(done);
    });
});

function returnFive() {
    return 5;
}

