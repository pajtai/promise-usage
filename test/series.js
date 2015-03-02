'use strict';

/*
var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

https://github.com/substack/node-mkdirp
*/

var BB = require('bluebird'),
    chai = require('chai'),
    should = chai.should();

describe('Running functions in series', function() {

    it('can start a promise chain with a synchronous method using resolve', function(done) {

        BB
            .try(returnFive)
            .then(function(fiver) {
                fiver.should.equal(5);
                //6..should.equal(2);
            })
            .then(done)
            .catch(done);
    });

    it('can start a promise chain with a value', function(done) {
        BB
            .resolve(5)
            .then(function(fiver) {
                fiver.should.equal(5);
            })
            .then(done)
            .catch(done);
        
    });

    it('can start a promise chain with a q promise', function(done) {
        var deferred = require('q').defer();

        BB
            .resolve(deferred.promise)
            .then(function(fiver) {
                fiver.should.equal(5);
            })
            .then(done)
            .catch(done);


        deferred.resolve(5);
    });

    it('cannot handle errors in methods passed to resolve', function(done) {
    
        try {
            BB.resolve(errorProne({}));
        } catch(e) {
            // expext and unhandled error here:
            done();
        }

    });

    it('can handle errors in methods passed to try', function(done) {
        
        BB
            .try(function() {
                return errorProne({some:'example'});
            })
            .then(function() {
                done('should not get here');
            })
            .catch(function(e) {
                e.message.should.equal("Cannot read property 'not' of undefined");
                done();
            });
    });
});

        function errorProne(user) {
            return 5 === user.does.not.exist;
        }

function returnFive() {
    return 5;
}

