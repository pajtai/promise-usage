'use strict';

var chai = require('chai'),
    BB = require('bluebird');

chai.should();

describe('collections', function() {

    describe('props', function() {
        it('can resolve with an object made up of promise values', function(done) {

            BB
                .props({
                    test1: waitResolve(3, 'a'),
                    test2: 5,
                    test3: waitResolve(5, 'b')
                })
                .then(function(obj) {

                    obj.should.deep.equal({
                        test1: 'a',
                        test2: 5,
                        test3: 'b'
                    });
                    done();
                })
                .catch(done);
        });
    });
});

function waitResolve(time, value) {
    return new BB(function(resolve) {
        setTimeout(function() {
            resolve(value);
        }, time);
    });
}
