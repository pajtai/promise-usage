'use strict';

var chai = require('chai'),
    BB = require('bluebird');

chai.should();

describe('scope', function() {

    it('should be able to track changes in object one scope up', function(done) {

        BB
            .try(function() {
                return doAsyncWork([]);
            })
            .then(function(results) {
                results.should.deep.equal([1, 2, 3]);
            })
            .then(done)
            .catch(done);

    });
});

// results is one scope up from the entire promise chain, it is accessed in each "getServerData"
function doAsyncWork(results) {
    return BB
        .bind({
            results : results
        })
        .then(
            getServerData(1))
        .then(
            attAtachData)
        .then(
            getServerData(2))
        .then(
            attAtachData)
        .then(
            getServerData(3))
        .then(
            attAtachData)
        .then(function() {
            return this.results;
        });
}

function getServerData(data, error) {
    return function() {
        return new BB(function(resolve, reject) {
            error ? reject(error) : resolve(data);
        });
    };
}

function attAtachData(data) {
    this.results.push(data);
}