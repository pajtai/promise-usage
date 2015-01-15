'use strict';

var chai = require('chai'),
    BB = require('bluebird'),
    waitThenReturnAsync = BB.promisify(waitThenReturn);

chai.should();

describe('promisification', function() {
    it('can create promise returning function of one value using promisify', function(done) {

        waitThenReturnAsync(5, 'one')
            .then(function(value) {
                value.should.equal('one');
            })
            .then(done)
            .catch(done);
    });

    describe('can create promise returning function of many values using promisify', function() {
        it('using a returned array', function(done) {

            waitThenReturnAsync(5, 'two', 'other', 'values')
                .then(function(values) {
                    values.should.deep.equal([
                        'two',
                        'other',
                        'values'
                    ]);
                })
                .then(done)
                .catch(done);
        });

        it('using a formal parameters', function(done) {

            waitThenReturnAsync(5, 'two', 'other', 'values')
                .spread(function(a, b, c) {
                    a.should.equal('two');
                    b.should.equal('other');
                    c.should.equal('values');
                })
                .then(done)
                .catch(done);
        });
    });

    it('can handle errors from promisified methods', function(done) {
        var error = BB.promisify(waitThenError);

        error(5, 'oh oh')
            .then(done)
            .catch(function(error) {
                error.message.should.equal('whoops');
            })
            .then(done)
            .catch(done);
    });
});

function waitThenReturn( /* time, args..., cb */ ) {
    var args = [].slice.apply(arguments),
        time = args.shift(),
        cb = args.pop();

    setTimeout(function() {
        args.unshift(undefined);
        cb.apply(cb, args);
    }, time);
}

function waitThenError(time, value, cb) {
    setTimeout(function() {
        cb(new Error('whoops'), value);
    }, time);
}
